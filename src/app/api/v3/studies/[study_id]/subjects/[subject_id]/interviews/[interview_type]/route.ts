import { Interviews } from "@/lib/models/Interviews";

export async function GET(
    request: Request, 
    props: { params: Promise<{ study_id: string, subject_id: string, interview_type: string }> }
): Promise<Response> {
    const params = await props.params;
    const { study_id, subject_id, interview_type } = params;

    if (!study_id || !subject_id || !interview_type) {
        return new Response(JSON.stringify({ error: 'Missing study_id or subject_id or interview_type parameter' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const interviews = await Interviews.getBySubjectAndInterviewType(
        study_id,
        subject_id,
        interview_type
    )

    if (!interviews) {
        return new Response(JSON.stringify({ error: 'Interviews not found' }), {
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
