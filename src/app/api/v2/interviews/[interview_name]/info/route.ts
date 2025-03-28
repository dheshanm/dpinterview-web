import { Interviews } from "@/lib/models/Interviews";

export async function GET(
    request: Request, 
    props: { params: Promise<{ interview_name: string }> }
): Promise<Response> {
    const params = await props.params;
    const interview_name = params.interview_name;

    if (!interview_name) {
        return new Response(JSON.stringify({ error: 'Missing name parameter' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const interviews = await Interviews.get(interview_name);

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
