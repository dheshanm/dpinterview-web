// fma_source_path text NOT NULL,
// fma_requested_by text NOT NULL,
// fma_index int4 NOT NULL,
// fma_codec_name varchar(255) NOT NULL,
// fma_codec_long_name varchar(255) NOT NULL,
// fma_profile varchar(255) NOT NULL,
// fma_codec_type varchar(255) NOT NULL,
// fma_codec_tag_string varchar(255) NOT NULL,
// fma_codec_tag varchar(255) NOT NULL,
// fma_sample_fmt varchar(255) NOT NULL,
// fma_sample_rate int4 NOT NULL,
// fma_channels int4 NOT NULL,
// fma_channel_layout varchar(255) NOT NULL,
// fma_bits_per_sample int4 NOT NULL,
// fma_r_frame_rate varchar(255) NOT NULL,
// fma_avg_frame_rate varchar(255) NOT NULL,
// fma_time_base varchar(255) NOT NULL,
// fma_start_pts int4 NOT NULL,
// fma_start_time varchar(255) NOT NULL,
// fma_duration varchar(255) NOT NULL,
// fma_extradata_size int4 NOT NULL,
export type DbFfprobeAudioMetadata = {
    fma_source_path: string;
    fma_requested_by: string;
    fma_index: number;
    fma_codec_name: string;
    fma_codec_long_name: string;
    fma_profile: string;
    fma_codec_type: string;
    fma_codec_tag_string: string;
    fma_codec_tag: string;
    fma_sample_fmt: string;
    fma_sample_rate: number;
    fma_channels: number;
    fma_channel_layout: string;
    fma_bits_per_sample: number;
    fma_r_frame_rate: string;
    fma_avg_frame_rate: string;
    fma_time_base: string;
    fma_start_pts: number;
    fma_start_time: string;
    fma_duration: string;
    fma_extradata_size: number;
};

// fmv_source_path text NOT NULL,
// fmv_requested_by text NOT NULL,
// ir_role varchar(255) NULL,
// fmv_index int4 NOT NULL,
// fmv_codec_name varchar(255) NOT NULL,
// fmv_codec_long_name varchar(255) NOT NULL,
// fmv_profile varchar(255) NOT NULL,
// fmv_codec_type varchar(255) NOT NULL,
// fmv_codec_tag_string varchar(255) NOT NULL,
// fmv_codec_tag varchar(255) NOT NULL,
// fmv_width int4 NOT NULL,
// fmv_height int4 NOT NULL,
// fmv_coded_width int4 NOT NULL,
// fmv_coded_height int4 NOT NULL,
// fmv_closed_captions int4 NOT NULL,
// fmv_film_grain int4 NOT NULL,
// fmv_has_b_frames int4 NOT NULL,
// fmv_sample_aspect_ratio varchar(255) NOT NULL,
// fmv_display_aspect_ratio varchar(255) NOT NULL,
// fmv_pix_fmt varchar(255) NOT NULL,
// fmv_level int4 NOT NULL,
// fmv_color_range varchar(255) NOT NULL,
// fmv_chrorma_location varchar(255) NOT NULL,
// fmv_field_order varchar(255) NOT NULL,
// fmv_refs int4 NOT NULL,
// fmv_r_frame_rate varchar(255) NOT NULL,
// fmv_avg_frame_rate varchar(255) NOT NULL,
// fmv_time_base varchar(255) NOT NULL,
// fmv_start_pts int4 NOT NULL,
// fmv_start_time varchar(255) NOT NULL,
// fmv_duration varchar(255) NOT NULL,
// fmv_extradata_size int4 NOT NULL,
export type DbFfprobeVideoMetadata = {
    fmv_source_path: string;
    fmv_requested_by: string;
    ir_role: string | null;
    fmv_index: number;
    fmv_codec_name: string;
    fmv_codec_long_name: string;
    fmv_profile: string;
    fmv_codec_type: string;
    fmv_codec_tag_string: string;
    fmv_codec_tag: string;
    fmv_width: number;
    fmv_height: number;
    fmv_coded_width: number;
    fmv_coded_height: number;
    fmv_closed_captions: number;
    fmv_film_grain: number;
    fmv_has_b_frames: number;
    fmv_sample_aspect_ratio: string;
    fmv_display_aspect_ratio: string;
    fmv_pix_fmt: string;
    fmv_level: number;
    fmv_color_range: string;
    fmv_chrorma_location: string;
    fmv_field_order: string;
    fmv_refs: number;
    fmv_r_frame_rate: string;
    fmv_avg_frame_rate: string;
    fmv_time_base: string;
    fmv_start_pts: number;
    fmv_start_time: string;
    fmv_duration: string;
    fmv_extradata_size: number;
};

// fm_source_path text NOT NULL,
// fm_requested_by text NOT NULL,
// fm_format_name text NULL,
// fm_format_long_name text NULL,
// fm_duration text NULL,
// fm_size text NULL,
// fm_bit_rate text NULL,
// fm_probe_score text NULL,
// fm_tags text NULL,
// fm_timestamp timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
export type DbFfprobeMetadata = {
    fm_source_path: string;
    fm_requested_by: string;
    fm_format_name: string | null;
    fm_format_long_name: string | null;
    fm_duration: string | null;
    fm_size: string | null;
    fm_bit_rate: string | null;
    fm_probe_score: string | null;
    fm_tags: string | null;
    fm_timestamp: Date;
};

export type FfprobeMetadataM = {
    _metadata: {
        interview_name: string;
    }
    metadata: DbFfprobeMetadata;
    audio: DbFfprobeAudioMetadata[];
    video: DbFfprobeVideoMetadata[];
};
