import { Interviews } from "@/lib/models/Interviews";

export async function GET(
    request: Request, 
    props: { params: Promise<{ study_id: string, subject_id: string }> }
): Promise<Response> {
    const params = await props.params;
    const { study_id, subject_id } = params;

    if (!study_id || !subject_id) {
        return new Response(JSON.stringify({ error: 'Missing study_id or subject_id parameter' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const interviews = await Interviews.getBySubject(
        study_id,
        subject_id
    )

    if (!interviews) {
        return new Response(JSON.stringify({ error: 'Interview not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify(interviews), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
