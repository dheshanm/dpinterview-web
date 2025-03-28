import { getConnection } from "@/lib/db";

import { DbFfprobeAudioMetadata, DbFfprobeVideoMetadata, DbFfprobeMetadata, FfprobeMetadataM } from "@/lib/types/ffprobe";

export class FfprobeMetadata {
    static async getffprobeVideoMetadata(source_path: string): Promise<DbFfprobeVideoMetadata[]> {
        const connection = getConnection();

        // Get Video Metadata
        const videoMetadataQuery = `
        SELECT *
        FROM ffprobe_metadata_video
        WHERE fmv_source_path = $1
        `;
        const videoMetadataResults = await connection.query(videoMetadataQuery, [source_path]);

        const videoMetadata = videoMetadataResults.rows.map((row: any) => {
            return {
                fmv_source_path: row.fmv_source_path,
                fmv_requested_by: row.fmv_requested_by,
                ir_role: row.ir_role,
                fmv_index: row.fmv_index,
                fmv_codec_name: row.fmv_codec_name,
                fmv_codec_long_name: row.fmv_codec_long_name,
                fmv_profile: row.fmv_profile,
                fmv_codec_type: row.fmv_codec_type,
                fmv_codec_tag_string: row.fmv_codec_tag_string,
                fmv_codec_tag: row.fmv_codec_tag,
                fmv_width: row.fmv_width,
                fmv_height: row.fmv_height,
                fmv_coded_width: row.fmv_coded_width,
                fmv_coded_height: row.fmv_coded_height,
                fmv_closed_captions: row.fmv_closed_captions,
                fmv_film_grain: row.fmv_film_grain,
                fmv_has_b_frames: row.fmv_has_b_frames,
                fmv_sample_aspect_ratio: row.fmv_sample_aspect_ratio,
                fmv_display_aspect_ratio: row.fmv_display_aspect_ratio,
                fmv_pix_fmt: row.fmv_pix_fmt,
                fmv_level: row.fmv_level,
                fmv_color_range: row.fmv_color_range,
                fmv_chrorma_location: row.fmv_chrorma_location,
                fmv_field_order: row.fmv_field_order,
                fmv_refs: row.fmv_refs,
                fmv_r_frame_rate: row.fmv_r_frame_rate,
                fmv_avg_frame_rate: row.fmv_avg_frame_rate,
                fmv_time_base: row.fmv_time_base,
                fmv_start_pts: row.fmv_start_pts,
                fmv_start_time: row.fmv_start_time,
                fmv_duration: row.fmv_duration,
                fmv_extradata_size: row.fmv_extradata_size
            };
        });
        return videoMetadata;
    }


    static async getffprobeAudioMetadata(source_path: string): Promise<DbFfprobeAudioMetadata[]> {
        const connection = getConnection();
        // Get Audio Metadata
        const audioMetadataQuery = `
        SELECT *
        FROM ffprobe_metadata_audio
        WHERE fma_source_path = $1
        `;
        const audioMetadataResults = await connection.query(audioMetadataQuery, [source_path]);

        const audioMetadata = audioMetadataResults.rows.map((row: any) => {
            return {
                fma_source_path: row.fma_source_path,
                fma_requested_by: row.fma_requested_by,
                fma_index: row.fma_index,
                fma_codec_name: row.fma_codec_name,
                fma_codec_long_name: row.fma_codec_long_name,
                fma_profile: row.fma_profile,
                fma_codec_type: row.fma_codec_type,
                fma_codec_tag_string: row.fma_codec_tag_string,
                fma_codec_tag: row.fma_codec_tag,
                fma_sample_fmt: row.fma_sample_fmt,
                fma_sample_rate: row.fma_sample_rate,
                fma_channels: row.fma_channels,
                fma_channel_layout: row.fma_channel_layout,
                fma_bits_per_sample: row.fma_bits_per_sample,
                fma_r_frame_rate: row.fma_r_frame_rate,
                fma_avg_frame_rate: row.fma_avg_frame_rate,
                fma_time_base: row.fma_time_base,
                fma_start_pts: row.fma_start_pts,
                fma_start_time: row.fma_start_time,
                fma_duration: row.fma_duration,
                fma_extradata_size: row.fma_extradata_size
            };
        });
        return audioMetadata;
    }

    static async getDbFfprobeMetadata(
        interview_name: string
    ): Promise<DbFfprobeMetadata | null> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM ffprobe_metadata
            LEFT JOIN decrypted_files ON decrypted_files.destination_path = ffprobe_metadata.fm_source_path
            LEFT JOIN interview_files ON interview_files.interview_file = decrypted_files.source_path
            LEFT JOIN interview_parts USING (interview_path)
            LEFT JOIN interviews USING (interview_name)
            WHERE interview_name = $1
            `,
            [interview_name]
        );

        if (results.rows.length === 0) {
            return null;
        }

        return results.rows[0] as DbFfprobeMetadata;
    }


    static async getFfprobeMetadata(interview_name: string): Promise<FfprobeMetadataM | null> {
        // Extract the first row of results into DbFfprobeMetadata
        const ffprobeMetadata = await this.getDbFfprobeMetadata(interview_name);
        if (!ffprobeMetadata) {
            return null;
        }

        const videoMetadata = await this.getffprobeVideoMetadata(ffprobeMetadata.fm_source_path);
        const audioMetadata = await this.getffprobeAudioMetadata(ffprobeMetadata.fm_source_path);

        return {
            _metadata: {
                interview_name: interview_name,
            },
            metadata: ffprobeMetadata,
            video: [...videoMetadata],
            audio: [...audioMetadata],
        };
    }

    static async getFfprobeMetadataExtractionDate(
        interview_name: string
    ): Promise<Date | null> {
        const ffprobeMetadata = await this.getDbFfprobeMetadata(interview_name);
        if (!ffprobeMetadata) {
            return null;
        }
        return ffprobeMetadata.fm_timestamp;
    }
}