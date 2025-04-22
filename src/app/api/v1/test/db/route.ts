import { Pool } from 'pg';
import { unformatSQL } from "@/lib/query";

export async function GET(): Promise<Response> {
    const connection = new Pool({
        user: 'pipeline',
        password: 'piedpiper',
        host: 'dna006.research.partners.org',
        database: 'dpinterview_v3',
        port: 5432,
        // Remove SSL configuration since the server doesn't support it
    });

    const baseQuery = `
        SELECT 1 AS test
    `;

    const { rows } = await connection.query(baseQuery);

    const metadata = {
        query: unformatSQL(baseQuery),
    };

    return new Response(JSON.stringify({ metadata, rows }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}