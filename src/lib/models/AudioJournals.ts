import { getConnection } from "@/lib/db";

import { DbAudioJournal } from "@/lib/types/audio_journals";

export class AudioJournals {
    static async getBySubject(
        study_id: string,
        subject_id: string
    ): Promise<DbAudioJournal[]> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM audio_journals
            WHERE subject_id = $1 AND study_id = $2
            ORDER BY aj_day
            `,
            [subject_id, study_id]
        );

        if (results.rows.length === 0) {
            return [];
        }

        const rows = results.rows as DbAudioJournal[];
        return rows;
    }

    static async getByJournalName(
        study_id: string,
        subject_id: string,
        journal_name: string
    ): Promise<DbAudioJournal | null> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM audio_journals
            WHERE subject_id = $1 AND study_id = $2 AND aj_name = $3
            `,
            [subject_id, study_id, journal_name]
        );

        if (results.rows.length === 0) {
            return null;
        }

        const row = results.rows[0] as DbAudioJournal;
        return row;
    }
}