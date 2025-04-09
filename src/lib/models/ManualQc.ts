import { getConnection } from "@/lib/db";

import { QcFormSchema, DbManualQc } from "@/lib/types/manual_qc";

export class ManualQc {
    static async addInterviewQc(
        interview_name: string,
        qc_data: QcFormSchema
    ): Promise<void> {
        const connection = getConnection();

        const qc_user = qc_data.qcUser;

        const dbQcData: Record<string, any> = {...qc_data};
        delete dbQcData.qcUser;
        delete dbQcData.qcDatetime;

        const query = `
            INSERT INTO manual_qc (qc_target_id, qc_target_type, qc_data, qc_user_id, qc_timestamp)
            VALUES ($1, $2, $3, $4, $5) ON CONFLICT (qc_target_id, qc_target_type)
            DO UPDATE SET
                qc_data = EXCLUDED.qc_data,
                qc_user_id = EXCLUDED.qc_user_id,
                qc_timestamp = EXCLUDED.qc_timestamp
        `;
        const values = [
            interview_name,
            'interview',
            JSON.stringify(dbQcData),
            qc_user,
            new Date().toISOString(),
        ];
        await connection.query(query, values);
    }

    static async getInterviewQc(
        interview_name: string
    ): Promise<DbManualQc[]> {
        const connection = getConnection();
        const query = `
            SELECT *
            FROM manual_qc
            WHERE qc_target_id = $1 AND qc_target_type = 'interview'
            ORDER BY qc_timestamp DESC
        `;
        const values = [interview_name];
        const results = await connection.query(query, values);
        return results.rows as DbManualQc[];
    }

}