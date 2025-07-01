// aj_path text NOT NULL,
// aj_name text NOT NULL,
// aj_date date NOT NULL,
// aj_day int4 NOT NULL,
// aj_session int4 NOT NULL,
// subject_id text NOT NULL,
// study_id text NOT NULL,
export type DbAudioJournal = {
    aj_path: string;
    aj_name: string;
    aj_datetime: Date;
    aj_day: number;
    aj_session: number;
    subject_id: string;
    study_id: string;
}