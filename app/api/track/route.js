
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const tracking_id = searchParams.get("search");

    const token = process.env.PACKNEXA_TOKEN;

    if (!tracking_id) {
        return new Response(JSON.stringify({ error: "Missing tracking ID" }), {
            status: 400,
        });
    }

    try {
        const externalRes = await fetch(`${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/order-view?tracking_id=${tracking_id}`, {
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store'
        });

        if (!externalRes.ok) {
            console.error("External API returned:", externalRes.status);
            return new Response(JSON.stringify({ error: "External API Error" }), { status: 502 });
        }

        const result = await externalRes.json();

        if (!result?.data) {
            return new Response(JSON.stringify({ error: "No parcel data found for this tracking ID." }), {
                status: 404,
            });
        }

        return Response.json(result.data);
    } catch (error) {
        console.error("API Route Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
