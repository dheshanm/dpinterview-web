import { DataDictionary } from "@/lib/models/DataDictionary";

export async function GET(
    request: Request, 
    props: { params: Promise<{ form_name: string }> }
): Promise<Response> {
    const params = await props.params;
    const interview_name = params.form_name;

    if (!interview_name) {
        return new Response(JSON.stringify({ error: 'Missing form_name parameter' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const dataDictionary = await DataDictionary.getDataDictionary(interview_name);
    if (!dataDictionary) {
        return new Response(JSON.stringify({ error: 'Form not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify(dataDictionary), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}