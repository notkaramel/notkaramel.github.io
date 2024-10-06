/*--- /api/coffee ---*/

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return new Response("I want tea actually\n", { status: 418 });
};