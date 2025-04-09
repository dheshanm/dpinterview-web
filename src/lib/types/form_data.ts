// subject_id text NOT NULL,
// study_id text NOT NULL,
// form_name text NOT NULL,
// event_name text NOT NULL,
// form_data jsonb NOT NULL,
// source_mdata timestamp NOT NULL,
// imported_timestamp timestamp DEFAULT CURRENT_TIMESTAMP NULL,
export type DbFormData = {
    subject_id: string;
    study_id: string;
    form_name: string;
    event_name: string;
    form_data: object;
    source_mdata: Date;
    imported_timestamp: Date;
}

// interview_name text NOT NULL,
// subject_id text NOT NULL,
// study_id text NOT NULL,
// form_name text NOT NULL,
// event_name text NOT NULL,
// expected_interview_date timestamp NOT NULL,
// expected_interview_day int4 NOT NULL,
// expected_interview_type text NOT NULL,
export type DbExpectedInterview = {
    interview_name: string;
    subject_id: string;
    study_id: string;
    form_name: string;
    event_name: string;
    expected_interview_date: Date;
    expected_interview_day: number;
    expected_interview_type: string;
}

export type FormDataM = {
    subject_id: string;
    study_id: string;
    form_name: string;
    event_name: string;
    form_data: Record<string, string>;
    source_mdata: Date;
    imported_timestamp: Date;
    expected_interview_date: Date;
    expected_interview_day: number;
    expected_interview_type: string;
    interview_name: string;
}
