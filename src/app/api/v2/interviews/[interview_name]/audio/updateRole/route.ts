import { InterviewFiles } from "@/lib/models/InterviewFiles";
import { DashboardActions } from "@/lib/models/DashboardActions";

export async function POST(
    request: Request,
    props: { params: Promise<{ interview_name: string }> }
): Promise<Response> {
    const params = await props.params;
    const interview_name = params.interview_name;

    const body = await request.json();

    if (!body) {
        return new Response(
            JSON.stringify({ error: "Missing body" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    const { audio_path, role } = body;

    if (!audio_path) {
        return new Response(
            JSON.stringify({ error: "Missing audio_path parameter" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    if (!role) {
        return new Response(
            JSON.stringify({ error: "Missing role parameter" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    await DashboardActions.recordAction(
        interview_name,
        "update_role",
        audio_path,
        "audio_path",
        {
            new_role: role,
        }
    )


    const newTags = await InterviewFiles.addRoleTag(
        audio_path,
        role,
    )

    return new Response(
        JSON.stringify({
            message: `Added ${role} role successfully`,
            new_tags: newTags,
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}