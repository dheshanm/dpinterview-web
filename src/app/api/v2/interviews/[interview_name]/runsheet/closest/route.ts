import { NextResponse } from 'next/server';

import { FormData } from "@/lib/models/FormData";

export async function GET(
    request: Request,
    props: { params: Promise<{ interview_name: string }> }
): Promise<Response> {
    const params = await props.params;
    const interview_name = params.interview_name;

    if (!interview_name) {
        return NextResponse.json({ error: 'Missing interview_name parameter' }, { status: 400 });
    }

    // parse interview_name into subject_id, study_id, interview_type, interview_day
    // PronetWU-WU64306-psychsInterview-day0050

    const regex = /^(?<study_id>[\w-]+)-(?<subject_id>[\w-]+)-(?<interview_type>[\w]+)Interview-day(?<interview_day>\d{4})$/;
    const match = interview_name.match(regex);

    if (!match || !match.groups) {
        return NextResponse.json({ error: 'Invalid interview_name format' }, { status: 400 });
    }

    const formData = await FormData.getClosestInterviewFormData(
        match.groups.subject_id,
        match.groups.study_id,
        match.groups.interview_type,
        parseInt(match.groups.interview_day, 10)
    )
    if (!formData) {
        return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    return NextResponse.json(formData);
}