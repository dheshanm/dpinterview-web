import { Pool } from 'pg';

let connection: Pool | undefined;

if (!connection) {
    const user = process.env.PG_user;
    const host = process.env.PG_host;
    const database = process.env.PG_database;
    const password = process.env.PG_password;
    const port = process.env.PG_port ? parseInt(process.env.PG_port, 10) : undefined;
    if (!user || !host || !database || !password || !port) {
        throw new Error("Database connection parameters are not set in environment variables");
    }

    connection = new Pool({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
        // ssl: {
        //     rejectUnauthorized: false,
        // }
    });
}

export function getConnection(): Pool {
    if (!connection) {
        throw new Error("Database connection is undefined");
    }
    return connection;
}

export default connection;
