// vs_path text NOT NULL,
// video_path text NOT NULL,
// ir_role text NOT NULL,
// vs_process_time float4 NULL,
// vs_timestamp timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
export type DbVideoStream = {
    vs_path: string;
    video_path: string;
    ir_role: string;
    vs_process_time: number | null;
    vs_timestamp: Date;
}
