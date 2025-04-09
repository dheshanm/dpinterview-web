import { getConnection } from "@/lib/db";

import { DbFile } from "@/lib/types/file";
import { DbTranscriptFiles, InterviewTranscriptFile } from "@/lib/types/interview";

export class InterviewTranscriptFiles {
    static async get(interview_name: string): Promise<InterviewTranscriptFile[]> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM transcript_files
            LEFT JOIN files ON transcript_file = file_path
            WHERE identifier_type = 'interview' AND
                identifier_name = $1
            `,
            [interview_name]
        );

        return results.rows.map((row: DbTranscriptFiles & DbFile) => {
            const transcript_file_tags = row.transcript_file_tags.split(',').map((tag: string) => tag.trim());
            return {
                interview_name: interview_name,
                transcript_file: {
                    file_path: row.file_path,
                    file_name: row.file_name,
                    file_type: row.file_type,
                    file_size_mb: row.file_size_mb,
                    m_time: row.m_time,
                    md5: row.md5,
                },
                transcript_file_tags: transcript_file_tags,
            };
        });
    }

    static async getTranscriptFile(interview_name: string): Promise<string | null> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT transcript_file FROM transcript_files
            WHERE identifier_name =  $1
            `,
            [interview_name]
        );

        if (results.rows.length === 0) {
            return null;
        }
        const transcriptFile = results.rows[0].transcript_file;
        return transcriptFile;
    }
}
