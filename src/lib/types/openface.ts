// vs_path text NOT NULL,
// ir_role text NOT NULL,
// video_path text NOT NULL,
// of_processed_path text NOT NULL,
// of_process_time float4 NULL,
// of_overlay_provess_time float4 NULL,
// of_timestamp timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
export type DbOpenface = {
    vs_path: string;
    ir_role: string;
    video_path: string;
    of_processed_path: string;
    of_process_time: number | null;
    of_overlay_process_time: number | null;
    of_timestamp: Date;
}
