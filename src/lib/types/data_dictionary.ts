// field_name text NULL,
// form_name text NULL,
// section_header text NULL,
// field_type text NULL,
// field_label text NULL,
// select_choices_or_calculations text NULL,
// field_note text NULL,
// text_validation_type_or_show_slider_number text NULL,
// text_validation_min text NULL,
// text_validation_max text NULL,
// identifier text NULL,
// branching_logic text NULL,
// required_field text NULL,
// custom_alignment text NULL,
// question_number float8 NULL,
// matrix_group_name text NULL,
// matrix_ranking float8 NULL,
// field_annotation text NULL
export type DbDataDictionary = {
    field_name: string | null;
    form_name: string | null;
    section_header: string | null;
    field_type: string | null;
    field_label: string | null;
    select_choices_or_calculations: string | null;
    field_note: string | null;
    text_validation_type_or_show_slider_number: string | null;
    text_validation_min: string | null;
    text_validation_max: string | null;
    identifier: string | null;
    branching_logic: string | null;
    required_field: string | null;
    custom_alignment: string | null;
    question_number: number | null;
    matrix_group_name: string | null;
    matrix_ranking: number | null;
    field_annotation: string | null;
}

export type DataDictionaryM = {
    field_name: string | null;
    form_name: string | null;
    field_label: string | null;
    field_type: string | null;
    // "select_choices_or_calculations":{"raw":"1, M1- Measure refusal (no reason provided) | 2, M2- No show | 3, M3- Research assistant forgot | 4, M4- Uncontrollable circumstance | 5, M5- Participant dropped out | M6, M6- Evaluation not necessary because the screening PSYCHS was done within 21 days of the final baseline visit component (not including RA prediction, CBC w/differential, and GCP Current Health Status)","parsed":[{"value":"1","label":"M1- Measure refusal (no reason provided)"},{"value":"2","label":"M2- No show"},{"value":"3","label":"M3- Research assistant forgot"},{"value":"4","label":"M4- Uncontrollable circumstance"},{"value":"5","label":"M5- Participant dropped out"},{"value":"M6","label":"M6- Evaluation not necessary because the screening PSYCHS was done within 21 days of the final baseline visit component (not including RA prediction"}]}
    select_choices_or_calculations: null | {
        raw: string;
        parsed: {
            value: string;
            label: string;
        }[];
    }
}
