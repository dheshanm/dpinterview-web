import { InterviewFiles } from "@/lib/models/InterviewFiles";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const interview_path = url.searchParams.get('interview_path');

    if (!interview_path) {
        return new Response(JSON.stringify({ error: 'Missing interview_path parameter' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const interviewFiles = await InterviewFiles.get(interview_path);

    if (!interviewFiles || interviewFiles.length === 0) {
        return new Response(JSON.stringify({ error: 'Interview not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify(interviewFiles), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
