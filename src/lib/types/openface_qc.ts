// of_processed_path text NOT NULL,
// faces_count int4 NOT NULL,
// frames_count int4 NOT NULL,
// sucessful_frames_count int4 NOT NULL,
// sucessful_frames_percentage float4 NOT NULL,
// successful_frames_confidence_mean float4 NULL,
// successful_frames_confidence_std float4 NULL,
// successful_frames_confidence_median float4 NULL,
// passed bool NOT NULL,
// ofqc_process_time float4 NULL,
// ofqc_timestamp timestamp NOT NULL,
export type DbOpenfaceQc = {
    of_processed_path: string;
    faces_count: number;
    frames_count: number;
    successful_frames_count: number;
    successful_frames_percentage: number;
    successful_frames_confidence_mean: number | null;
    successful_frames_confidence_std: number | null;
    successful_frames_confidence_median: number | null;
    passed: boolean;
    ofqc_process_time: number | null;
    ofqc_timestamp: Date;
}
