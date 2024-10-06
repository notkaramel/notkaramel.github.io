/*--- /api/coffee ---*/

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const myOptions = { status: 418 };
    return new Response("I want tea actually\n", myOptions);
};