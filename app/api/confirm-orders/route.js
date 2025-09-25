




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
      `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/confirm-orders-list`,
      {
        headers: {
          Authorization: authHeader, 
          Accept: "application/json",
        },
      }
    );

    const confirmedOrders = response.data?.confirmed_order_list ?? [];

    return new Response(JSON.stringify({ confirmed_order_list: confirmedOrders }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Confirm orders fetch failed:", error.response?.data || error.message);

    return new Response(
      JSON.stringify({
        message: "Confirm orders fetch failed",
        error: error.response?.data || error.message,
      }),
      { status: error.response?.status || 500 }
    );
  }
}
