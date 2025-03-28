// da_id serial4 NOT NULL,
// interview_name varchar(255) NOT NULL,
// da_action varchar(255) NOT NULL,
// da_user_id varchar(255) NOT NULL,
// da_target_id varchar(255) NOT NULL,
// da_target_type varchar(255) NOT NULL,
// da_timestamp timestamp DEFAULT CURRENT_TIMESTAMP NULL,
export type DbDashboardAction = {
    da_id: number;
    interview_name: string;
    da_action: string;
    da_user_id: string;
    da_target_id: string;
    da_target_type: string;
    da_timestamp: Date | null;
}