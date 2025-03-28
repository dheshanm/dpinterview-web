import { getConnection } from "@/lib/db";

import { DbVideoQuickQc } from "@/lib/types/video_qqc";


export class VideoQuickQc {
    static async get(interview_name: string): Promise<DbVideoQuickQc | null> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT video_quick_qc.*
            FROM video_quick_qc
            LEFT JOIN decrypted_files ON decrypted_files.destination_path = video_quick_qc.video_path
            LEFT JOIN interview_files ON interview_files.interview_file = decrypted_files.source_path
            LEFT JOIN interview_parts USING (interview_path)
            LEFT JOIN interviews USING (interview_name)
            WHERE interviews.interview_name = $1 AND
                interview_parts.is_primary = true
            `,
            [interview_name]
        );

        if (results.rows.length === 0) {
            return null;
        }

        return results.rows[0] as DbVideoQuickQc;
    }
}