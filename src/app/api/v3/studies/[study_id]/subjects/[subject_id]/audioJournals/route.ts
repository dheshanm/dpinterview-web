import { AudioJournals } from "@/lib/models/AudioJournals";

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

    const journals = await AudioJournals.getBySubject(
        study_id,
        subject_id
    )

    if (!journals) {
        return new Response(JSON.stringify({ error: 'No journals found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify(journals), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
