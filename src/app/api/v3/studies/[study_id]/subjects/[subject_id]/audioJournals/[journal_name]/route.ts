import { AudioJournals } from "@/lib/models/AudioJournals";

export async function GET(
    request: Request, 
    props: { params: Promise<{ study_id: string, subject_id: string, journal_name: string }> }
): Promise<Response> {
    const params = await props.params;
    const { study_id, subject_id, journal_name } = params;

    if (!study_id || !subject_id || !journal_name) {
        return new Response(JSON.stringify({ error: 'Missing study_id or subject_id or journal_name parameter' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const journal = await AudioJournals.getByJournalName(
        study_id,
        subject_id,
        journal_name
    )

    if (!journal) {
        return new Response(JSON.stringify({ error: 'No journals found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify(journal), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
