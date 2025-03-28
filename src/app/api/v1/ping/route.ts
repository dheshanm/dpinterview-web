export async function GET(
    _: Request  // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<Response> {
    return new Response(JSON.stringify({ message: 'pong' }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
