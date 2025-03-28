import { InterviewFiles } from "@/lib/models/InterviewFiles";
import { getConnection } from "@/lib/db";

import { DbInterviewPart, InterviewPart } from "@/lib/types/interview";

export class InterviewParts {
    static async get(interview_name: string): Promise<InterviewPart[]> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM interview_parts
            WHERE interview_name = $1
            ORDER BY interview_day, interview_part
            `,
            [interview_name]
        );
        const interviewParts: InterviewPart[] = [];

        for (const row of results.rows as DbInterviewPart[]) {
            interviewParts.push({
                interview_path: row.interview_path,
                interview_name: row.interview_name,
                interview_day: row.interview_day,
                interview_part: row.interview_part,
                interview_datetime: row.interview_datetime,
                is_primary: row.is_primary,
                is_duplicate: row.is_duplicate,
                interview_files: await InterviewFiles.get(row.interview_path),
            });
        }

        return interviewParts;
    }

    static async setPrimary(interview_path: string, is_primary: boolean): Promise<void> {
        const connection = getConnection();
        await connection.query(
            `
            UPDATE interview_parts
            SET is_primary = $1
            WHERE interview_path = $2
            `,
            [is_primary, interview_path]
        );
    }

    static async setDuplicate(interview_path: string, is_duplicate: boolean): Promise<void> {
        const connection = getConnection();
        await connection.query(
            `
            UPDATE interview_parts
            SET is_duplicate = $1
            WHERE interview_path = $2
            `,
            [is_duplicate, interview_path]
        );
    }
}