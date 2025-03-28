// video_path text NOT NULL,
// has_black_bars bool NOT NULL,
// black_bar_height int4 NULL,
// vqqc_process_time float4 NOT NULL,
// vqqc_timestamp timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
export type DbVideoQuickQc = {
    video_path: string;
    has_black_bars: boolean;
    black_bar_height: number | null;
    vqqc_process_time: number;
    vqqc_timestamp: Date;
};
