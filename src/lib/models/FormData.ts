import { getConnection } from "@/lib/db";

import { FormDataM } from "@/lib/types/form_data";

export class FormData {
    static async getInterviewFormData(interview_name: string): Promise<FormDataM | undefined> {
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
            return undefined;
        }
        const formDataRow = formDataRows[0];

        return formDataRow;
    }

    static async getClosestInterviewFormData(
        subject_id: string,
        study_id: string,
        interview_type: string,
        interview_day: number,
        threshold: number = 10
    ): Promise<FormDataM | undefined> {
        const connection = getConnection();

        // SELECT *
        // FROM public.expected_interviews
        // LEFT JOIN form_data USING (subject_id, study_id, form_name, event_name)
        // WHERE subject_id = $1
        //     AND study_id = $2
        //     AND expected_interview_type = $3
        // ORDER BY ABS(expected_interview_day - $4) ASC
        // LIMIT 1;
        const formDataQuery = `
        WITH closest_interview AS (
            SELECT *,
                ABS(expected_interview_day - $4) AS day_difference
            FROM public.expected_interviews
            LEFT JOIN form_data USING (subject_id, study_id, form_name, event_name)
                    WHERE subject_id = $1
                AND study_id = $2
                AND expected_interview_type = $3
            ORDER BY day_difference ASC
            LIMIT 1
        )
        SELECT *
        FROM closest_interview
        WHERE day_difference <= $5
        `

        const formDataResults = await connection.query(formDataQuery, [
            subject_id,
            study_id,
            interview_type,
            interview_day,
            threshold,
        ]);
        const formDataRows = formDataResults.rows as FormDataM[];

        // Only 1 row should be returned
        if (formDataRows.length === 0) {
            return undefined;
        }

        const formDataRow = formDataRows[0];
        return formDataRow;
    }
}