import { getConnection } from "@/lib/db";

import { DbOpenfaceQc } from "@/lib/types/openface_qc";

export class OpenfaceQc {
    static async get(interview_name: string): Promise<DbOpenfaceQc | null> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT openface_qc.*
            FROM openface_qc
            LEFT JOIN openface USING(of_processed_path)
            LEFT JOIN video_streams using (vs_path, video_path, ir_role)
            LEFT JOIN video_quick_qc using (video_path)
            LEFT JOIN decrypted_files ON decrypted_files.destination_path = video_quick_qc.video_path
            LEFT JOIN interview_files ON interview_files.interview_file = decrypted_files.source_path
            LEFT JOIN interview_parts USING (interview_path)
            LEFT JOIN interviews USING (interview_name)
            WHERE interviews.interview_name = $1 AND
                ir_role = 'subject'
            `,
            [interview_name]
        );

        if (results.rows.length === 0) {
            return null;
        }

        const row = results.rows[0];
        const data = {
            of_processed_path: row.of_processed_path,
            faces_count: row.faces_count,
            frames_count: row.frames_count,
            successful_frames_count: row.sucessful_frames_count,
            successful_frames_percentage: row.sucessful_frames_percentage,
            successful_frames_confidence_mean: row.successful_frames_confidence_mean,
            successful_frames_confidence_std: row.successful_frames_confidence_std,
            successful_frames_confidence_median: row.successful_frames_confidence_median,
            passed: row.passed,
            ofqc_process_time: row.ofqc_process_time,
            ofqc_timestamp: new Date(row.ofqc_timestamp)
        } as DbOpenfaceQc;
        return data;
    }
}
