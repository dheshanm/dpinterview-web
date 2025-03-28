import { getConnection } from "@/lib/db";

import { DbFile } from "@/lib/types/file";
import { DbInterviewFile, InterviewFile } from "@/lib/types/interview";

type InterviewFileJoinFile = DbInterviewFile & DbFile;

const availableRoles = ['interviewer', 'participant', 'uncategorized'];

export class InterviewFiles {
    static async get(interview_path: string): Promise<InterviewFile[]> {
        const connection = getConnection();
        const results = await connection.query(
            `
            SELECT *
            FROM interview_files
            LEFT JOIN files ON interview_file = file_path
            WHERE interview_path = $1
            `,
            [interview_path]
        );
        return results.rows.map((row: InterviewFileJoinFile) => {
            const interview_file_tags = row.interview_file_tags.split(',').map((tag: string) => tag.trim());
            return {
                interview_file: {
                    file_path: row.file_path,
                    file_name: row.file_name,
                    file_type: row.file_type,
                    file_size_mb: row.file_size_mb,
                    m_time: row.m_time,
                    md5: row.md5,
                },
                interview_file_tags: interview_file_tags,
                ignored: row.ignored,
            };
        });
    }

    static async getInterviewName(file_path: string): Promise<string | null> {
        const connection = getConnection();
        const result = await connection.query(
            `
            SELECT interview_name
            FROM interview_files
            LEFT JOIN interview_parts USING (interview_path)
            WHERE interview_file = $1
            `,
            [file_path]
        );
        if (result.rows.length > 0) {
            return result.rows[0].interview_name;
        }
        return null;
    }

    static async addRoleTag(file_path: string, role: string): Promise<string> {
        const connection = getConnection();
        const currentRolwQuery = `
            SELECT interview_file_tags
            FROM interview_files
            WHERE interview_file = $1
        `;
        const currentRoleResult = await connection.query(currentRolwQuery, [file_path]);
        const currentRoleRow = currentRoleResult.rows[0];
        const currentTags = currentRoleRow ? currentRoleRow.interview_file_tags.split(',').map((tag: string) => tag.trim()) : [];

        // Remove existing role tag if it exists
        const updatedTags = currentTags.filter((tag: string) => !availableRoles.some((role: string) => tag.toLowerCase().includes(role)));
        // Add the new role tag
        updatedTags.push(role);
        const updatedTagsString: string = updatedTags.join(',');

        const updateQuery = `
            UPDATE interview_files
            SET interview_file_tags = $1
            WHERE interview_file = $2
        `;
        await connection.query(updateQuery, [updatedTagsString, file_path]);

        return updatedTagsString;
    }

    static async removeRoleTag(file_path: string): Promise<string> {
        const connection = getConnection();
        const currentRolwQuery = `
            SELECT interview_file_tags
            FROM interview_files
            WHERE interview_file = $1
        `;
        const currentRoleResult = await connection.query(currentRolwQuery, [file_path]);
        const currentRoleRow = currentRoleResult.rows[0];
        const currentTags = currentRoleRow ? currentRoleRow.interview_file_tags.split(',').map((tag: string) => tag.trim()) : [];

        // Remove existing role tag if it exists
        const updatedTags = currentTags.filter((tag: string) => !availableRoles.some((role: string) => tag.toLowerCase().includes(role)));
        // Mark as uncategorized
        updatedTags.push('uncategorized');
        const updatedTagsString: string = updatedTags.join(',');

        const updateQuery = `
            UPDATE interview_files
            SET interview_file_tags = $1
            WHERE interview_file = $2
        `;
        await connection.query(updateQuery, [updatedTagsString, file_path]);
        return updatedTagsString;
    }

}
