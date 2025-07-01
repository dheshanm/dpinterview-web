import { AudioJournals } from "@/lib/models/AudioJournals";
import { Interviews } from "@/lib/models/Interviews";

import { DataCollectionEvent } from "@/lib/types/timeline";

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

    const interviews = await Interviews.getBySubject(
        study_id,
        subject_id
    )

    
    if (!journals && !interviews) {
        return new Response(JSON.stringify({ error: 'No journals or interviews found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    
    // Combine journals and interviews
    // sorting by collection date
    const timeline: DataCollectionEvent[] = [];
    if (journals) {
        timeline.push(...journals.map(journal => ({
            identifier: journal.aj_name,
            type: 'audio_journal',
            datetime: journal.aj_datetime,
        })));
    }
    if (interviews) {
        timeline.push(...interviews.map(interview => ({
            identifier: interview.interview_name,
            type: interview.interview_type === 'open' ? 'open_interview' : 'psychs_interview',
            datetime: interview.interview_datetime,
        })));
    }

    // Sort by datetime
    timeline.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

    return new Response(JSON.stringify(timeline), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
