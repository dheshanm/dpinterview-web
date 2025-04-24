// interview_name text NOT NULL,
// pr_version text NOT NULL,
// pr_path text NOT NULL,
// pr_generation_time float4 NOT NULL,
// pr_timestamp timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
export type DbPdfReport = {
    interview_name: string;
    pr_version: string;
    pr_path: string;
    pr_generation_time: number;
    pr_timestamp: Date;
}
