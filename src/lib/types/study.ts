export type DbStudy = {
    study_id: string;
}

export type StudyStatistics = {
    study_id: string;
    subjects_count: number;
    interviews_count: number;
    expected_interviews_count: number;
    audio_journals_count: number;
}
