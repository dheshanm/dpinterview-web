import { FormData} from "@/lib/models/FormData";

export async function GET(
    request: Request, 
    props: { params: Promise<{ interview_name: string }> }
): Promise<Response> {
    const params = await props.params;
    const interview_name = params.interview_name;

    if (!interview_name) {
        return new Response(JSON.stringify({ error: 'Missing interview_name parameter' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const formData = await FormData.getInterviewFormData(interview_name);
    if (!formData) {
        return new Response(JSON.stringify({ error: 'Interview not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify(formData), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
