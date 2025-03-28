import { getConnection } from "@/lib/db";

import { DbVideoStream } from "@/lib/types/video_stream";

export class VideoStream {
    static async get(interview_name: string): Promise<DbVideoStream[]> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT video_streams.*
            FROM video_streams
            LEFT JOIN decrypted_files ON decrypted_files.destination_path = video_streams.video_path
            LEFT JOIN interview_files ON interview_files.interview_file = decrypted_files.source_path
            LEFT JOIN interview_parts USING (interview_path)
            LEFT JOIN interviews USING (interview_name)
            WHERE interviews.interview_name = $1 AND
                interview_parts.is_primary = true
            `,
            [interview_name]
        );

        if (results.rows.length === 0) {
            return []
        }

        return results.rows.map(row => ({
            vs_path: row.vs_path,
            video_path: row.video_path,
            ir_role: row.ir_role,
            vs_process_time: row.vs_process_time,
            vs_timestamp: new Date(row.vs_timestamp)
        })) as DbVideoStream[];
    }

    static async getCount(interview_name: string): Promise<number> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT COUNT(*) as count
            FROM video_streams
            LEFT JOIN decrypted_files ON decrypted_files.destination_path = video_streams.video_path
            LEFT JOIN interview_files ON interview_files.interview_file = decrypted_files.source_path
            LEFT JOIN interview_parts USING (interview_path)
            LEFT JOIN interviews USING (interview_name)
            WHERE interviews.interview_name = $1
            `,
            [interview_name]
        );

        const count = results.rows[0].count;
        return parseInt(count, 10);
    }
}