import { Interviews } from "@/lib/models/Interviews";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const interview_name = url.searchParams.get('name');

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
