import { getConnection } from "@/lib/db";

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
    const studyId = url.searchParams.get('study_id');
    const subjectId = url.searchParams.get('subject_id');
    const type = url.searchParams.get('type');
    const limit = url.searchParams.get('limit') || 5;

    let query = "SELECT * FROM interviews";
    const params: any[] = [];
    let paramIndex = 1;

    if (studyId) {
        query += ` WHERE study_id = $${paramIndex++}`;
        params.push(studyId);
    }

    if (subjectId) {
        query += ` ${params.length ? 'AND' : 'WHERE'} subject_id = $${paramIndex++}`;
        params.push(subjectId);
    }

    if (type) {
        query += ` ${params.length ? 'AND' : 'WHERE'} interview_type = $${paramIndex++}`;
        params.push(type);
    }

    query += ` LIMIT ${limit}`;

    const { rows } = await connection.query(query, params);
    return new Response(JSON.stringify(rows), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
