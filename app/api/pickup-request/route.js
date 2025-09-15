
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/pick-up-request`,
      {
        pick_up_address: body.pick_up_address,
        Note: body.Note,
        estimated_parcel: body.estimated_parcel,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.PACKNEXA_TOKEN}`,
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Pickup request failed:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({ message: "Pickup request failed", error: error.message }),
      { status: error.response?.status || 500 }
    );
  }
}
