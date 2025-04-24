import { getConnection } from "@/lib/db";

import { DbPdfReport } from "@/lib/types/pdf_reports";

export class PdfReports {
    static async get(interview_name: string): Promise<DbPdfReport | null> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT pdf_reports.*
            FROM pdf_reports
            WHERE interview_name = $1
            ORDER BY pr_version DESC
            LIMIT 1
            `,
            [interview_name]
        );

        if (results.rows.length === 0) {
            return null;
        }

        const row = results.rows[0];
        const data = {
            interview_name: row.interview_name,
            pr_version: row.pr_version,
            pr_path: row.pr_path,
            pr_generation_time: row.pr_generation_time,
            pr_timestamp: new Date(row.pr_timestamp)
        } as DbPdfReport;
        return data;
    }
}
