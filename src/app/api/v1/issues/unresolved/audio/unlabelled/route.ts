import { getConnection } from "@/lib/db";
import { unformatSQL } from "@/lib/query";


export async function GET(request: Request): Promise<Response> {
    const connection = getConnection();
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit') || 5;
    const offset = url.searchParams.get('offset') || 0;

    const baseQuery = `
        SELECT DISTINCT interviews.*
        FROM interviews
        JOIN interview_parts ip ON interviews.interview_name = ip.interview_name
        WHERE EXISTS (
            SELECT 1
            FROM interview_files ifs
            WHERE ifs.interview_path = ip.interview_path
            AND ifs.interview_file_tags LIKE '%participant%'
        )
        AND NOT EXISTS (
            SELECT 1
            FROM interview_files ifs
            WHERE ifs.interview_path = ip.interview_path
            AND ifs.interview_file_tags LIKE '%interviewer%'
        )
        ORDER BY interviews.interview_name ASC
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