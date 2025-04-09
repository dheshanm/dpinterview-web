import { getConnection } from "@/lib/db";

import { DbFormData, DbExpectedInterview, FormDataM } from "@/lib/types/form_data";

export class FormData {
    static async getInterviewFormData(interview_name: string): Promise<FormDataM> {
        const connection = getConnection();

        // Get Form Data
        const formDataQuery = `
        SELECT
            subject_id,
            study_id,
            form_name,
            event_name,
            form_data,
            source_mdata,
            imported_timestamp,
            expected_interview_date,
            expected_interview_day,
            expected_interview_type,
            interview_name
        FROM expected_interviews
        LEFT JOIN form_data USING (subject_id, study_id, form_name, event_name)
        WHERE interview_name = $1
        `;
        const formDataResults = await connection.query(formDataQuery, [interview_name]);
        const formDataRows = formDataResults.rows as FormDataM[];

        // Only 1 row should be returned
        if (formDataRows.length === 0) {
            throw new Error(`No form data found for interview ${interview_name}`);
        }
        const formDataRow = formDataRows[0];

        return formDataRow;
    }
}