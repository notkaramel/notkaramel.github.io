// /api endpoint

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const myBlob = "hello";
    const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
    return new Response(myBlob, myOptions);
};