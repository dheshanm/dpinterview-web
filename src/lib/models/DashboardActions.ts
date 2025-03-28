import { getConnection } from "@/lib/db";


export class DashboardActions {
    static async recordAction(
        interview_name: string,
        action: string,
        target_id: string,
        target_type: string,
        metadata?: object
    ) {
        const connection = getConnection();

        if (metadata) {
            const metadataString = JSON.stringify(metadata);
            await connection.query(
                `
                INSERT INTO dashboard_actions (interview_name, da_action, da_user_id, da_target_id, da_target_type, da_metadata)
                VALUES ($1, $2, $3, $4, $5, $6)
                `,
                [
                    interview_name,
                    action,
                    "dashboard_user",
                    target_id,
                    target_type,
                    metadataString,
                ]
            );
        } else {
            await connection.query(
                `
                INSERT INTO dashboard_actions (interview_name, da_action, da_user_id, da_target_id, da_target_type)
                VALUES ($1, $2, $3, $4, $5)
                `,
                [
                    interview_name,
                    action,
                    "dashboard_user",
                    target_id,
                    target_type,
                ]
            );
        }
    }
}

