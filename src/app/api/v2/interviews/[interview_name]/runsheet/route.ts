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

    const formData = await FormData.getInterviewFormData(interview_name);
    if (!formData) {
        const redirectUrl = new URL(`/api/v2/interviews/${interview_name}/runsheet/closest`, request.url);
        return NextResponse.redirect(redirectUrl);
        // return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    return NextResponse.json(formData);
}
