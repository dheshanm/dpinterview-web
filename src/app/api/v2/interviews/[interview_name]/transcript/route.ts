import { NextResponse } from 'next/server';

import { InterviewTranscriptFiles } from '@/lib/models/TranscriptFiles';

export async function GET(
    request: Request,
    props: { params: Promise<{ interview_name: string }> }
): Promise<Response> {
    const params = await props.params;
    const interview_name = params.interview_name;

    if (!interview_name) {
        return NextResponse.json({ error: 'Missing interview_name parameter' }, { status: 400 });
    }

    const transcriptFile = await InterviewTranscriptFiles.getTranscriptFile(interview_name);

    if (!transcriptFile) {
        return NextResponse.json({ error: 'Transcript file not found' }, { status: 404 });
    }

    // Redirect to the transcript file URL
    // http://localhost:45000/payload=[<path>]

    const redirectUrl = new URL(`http://localhost:45000/payload=[${transcriptFile}]`);
    return NextResponse.redirect(redirectUrl);
}