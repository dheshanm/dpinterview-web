import { getConnection } from "@/lib/db";
import { unformatSQL } from "@/lib/query";

/**
 * Handles the GET request to fetch interviews from the database.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a Response object containing the fetched interviews in JSON format.
 *
 */
export async function GET(request: Request): Promise<Response> {
    const connection = getConnection();
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit') || 5;
    const offset = url.searchParams.get('offset') || 0;

    const baseQuery = `
        SELECT 
            i.interview_name,
            i.interview_type,
            i.subject_id,
            i.study_id,
            COUNT(ip.interview_part) AS parts_count
        FROM 
            public.interviews i
        JOIN 
            public.interview_parts ip 
            ON i.interview_name = ip.interview_name
        GROUP BY 
            i.interview_name,
            i.interview_type,
            i.subject_id,
            i.study_id
        HAVING 
            COUNT(ip.interview_part) > 1
        ORDER BY
            i.interview_name
    `;

    const countQuery = `SELECT COUNT(*) FROM (${baseQuery}) AS total_count`;
    const countResult = await connection.query(countQuery);
    const totalRows = countResult.rows[0].count;

    const limitedQuery = `${baseQuery} LIMIT ${limit} OFFSET ${offset}`;
    const { rows } = await connection.query(limitedQuery);

    const metadata = {
        query: unformatSQL(limitedQuery),
        totalRows,
        limit,
        offset,
    };

    return new Response(JSON.stringify({ metadata, rows }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
