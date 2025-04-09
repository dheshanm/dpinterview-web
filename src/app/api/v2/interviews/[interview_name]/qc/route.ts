import { ManualQc } from "@/lib/models/ManualQc";

export async function POST(
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

    const body = await request.json();

    await ManualQc.addInterviewQc(
        interview_name,
        body
    );

    return new Response(JSON.stringify({ message: 'QC data added successfully' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function GET(
    _: Request,
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

    const qc_data = await ManualQc.getInterviewQc(interview_name);

    return new Response(JSON.stringify(qc_data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}