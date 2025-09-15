
import axios from "axios";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization"); 

    if (!authHeader) {
      return new Response(
        JSON.stringify({ message: "No token provided" }),
        { status: 401 }
      );
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/user-info`,
      {
        headers: {
          Authorization: authHeader, 
        },
      }
    );

    const user = response.data?.user ?? null;

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("User info fetch failed:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({
        message: "User info fetch failed",
        error: error.response?.data || error.message,
      }),
      { status: error.response?.status || 500 }
    );
  }
}
