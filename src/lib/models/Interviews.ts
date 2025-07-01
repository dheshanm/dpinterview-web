import { getConnection } from "@/lib/db";
import { InterviewParts } from '@/lib/models/InterviewParts';
import { TranscriptFiles } from "@/lib/models/TranscriptFiles";

import { DbInterview, Interview, DbInterviewEnhanced } from "@/lib/types/interview";

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
        const transcript_files = await TranscriptFiles.getForInterview(interview_name);
        return {
            interview_name: row.interview_name,
            interview_type: row.interview_type,
            subject_id: row.subject_id,
            study_id: row.study_id,
            parts: parts,
            transcript_files: transcript_files,
        };
    }

    static async getBySubject(study_id: string, subject_id: string): Promise<DbInterviewEnhanced[]> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM interviews
            LEFT JOIN interview_parts USING (interview_name)
            WHERE subject_id = $1 AND 
                study_id = $2 AND
                interview_parts.is_primary IS TRUE
            `,
            [subject_id, study_id]
        );

        if (results.rows.length === 0) {
            return [];
        }
        
        const rows = results.rows.map(row => ({
            // Explicitly map fields from row to DbInterviewEnhanced properties
            interview_name: row.interview_name,
            interview_type: row.interview_type,
            subject_id: row.subject_id,
            study_id: row.study_id,
            interview_day: row.interview_day,
            interview_datetime: row.interview_datetime,
        })) as DbInterviewEnhanced[];
        return rows;
    }

    static async getBySubjectAndInterviewType(
        study_id: string,
        subject_id: string,
        interview_type: string
    ) : Promise<DbInterview[]> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM interviews
            WHERE subject_id = $1 AND study_id = $2 AND interview_type = $3
            `,
            [subject_id, study_id, interview_type]
        );

        if (results.rows.length === 0) {
            return [];
        }

        const rows = results.rows as DbInterview[];
        return rows;
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
