import { InterviewFiles } from "@/lib/models/InterviewFiles";
import { DashboardActions } from "@/lib/models/DashboardActions";

export async function POST(
    request: Request,
    props: { params: Promise<{ interview_name: string }> }
): Promise<Response> {
    const params = await props.params;
    const interview_name = params.interview_name;

    const body = await request.json();
    const audio_path: string = body.audio_path;

    if (audio_path === undefined) {
        return new Response(
            JSON.stringify({
                error: "Missing audio_path parameter",
            }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    await DashboardActions.recordAction(
        interview_name,
        "clear_role",
        audio_path,
        "audio_path"
    )


    const newTags = await InterviewFiles.removeRoleTag(
        audio_path,
    )

    return new Response(
        JSON.stringify({
            message: "Role cleared successfully",
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