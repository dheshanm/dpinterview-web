import { getConnection } from "@/lib/db";
import { InterviewParts } from '@/lib/models/InterviewParts';
import { InterviewTranscriptFiles } from "./TranscriptFiles";

import { DbInterview, Interview } from "@/lib/types/interview";

export class Interviews {
    static async get(interview_name: string): Promise<Interview | null> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM interviews
            WHERE interview_name = $1
            `,
            [interview_name]
        );

        if (results.rows.length === 0) {
            return null;
        }

        const row = results.rows[0] as DbInterview;
        const parts = await InterviewParts.get(interview_name);
        const transcript_files = await InterviewTranscriptFiles.get(interview_name);
        return {
            interview_name: row.interview_name,
            interview_type: row.interview_type,
            subject_id: row.subject_id,
            study_id: row.study_id,
            parts: parts,
            transcript_files: transcript_files,
        };
    }

    static async hasDuplicate(interview_name: string): Promise<boolean> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT COUNT(*) as count
            FROM interview_parts
            WHERE interview_name = $1
            `,
            [interview_name]
        );

        return results.rows[0].count > 1;
    }

    static async hasPrimary(interview_name: string): Promise<boolean> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT COUNT(*) as count
            FROM interview_parts
            WHERE interview_name = $1 AND is_primary = true
            `,
            [interview_name]
        );

        const count = parseInt(results.rows[0].count, 10);

        return count === 1;
    }
}
