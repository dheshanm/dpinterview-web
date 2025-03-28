import { getConnection } from "@/lib/db";

import { DbOpenface } from "@/lib/types/openface";


export class OpenFace {
    static async get(interview_name: string): Promise<DbOpenface[]> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT openface.*
            FROM openface
            LEFT JOIN video_streams using (vs_path)
            LEFT JOIN decrypted_files ON decrypted_files.destination_path = openface.video_path
            LEFT JOIN interview_files ON interview_files.interview_file = decrypted_files.source_path
            LEFT JOIN interview_parts USING (interview_path)
            LEFT JOIN interviews USING (interview_name)
            WHERE interviews.interview_name = $1
            `,
            [interview_name]
        );

        if (results.rows.length === 0) {
            return [];
        }

        return results.rows.map(row => ({
            vs_path: row.vs_path,
            video_path: row.video_path,
            ir_role: row.ir_role,
            of_processed_path: row.of_processed_path,
            of_process_time: row.of_process_time,
            of_overlay_process_time: row.of_overlay_process_time,
            of_timestamp: new Date(row.of_timestamp)
        })) as DbOpenface[];
    }

    static async getCount(interview_name: string): Promise<number> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT COUNT(*) as count
            FROM openface
            LEFT JOIN video_streams using (vs_path)
            LEFT JOIN decrypted_files ON decrypted_files.destination_path = openface.video_path
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