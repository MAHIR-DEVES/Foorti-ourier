
// export async function GET(req) {
//   const token = process.env.PACKNEXA_TOKEN;

//   if (!token) {
//     return new Response(JSON.stringify({ error: "Missing token" }), {
//       status: 500,
//     });
//   }

//   try {

//     const response = await fetch(`${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/confirm-orders-list`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
      
//     });

//     const text = await response.text();

//     try {
//       const json = JSON.parse(text);
//       return new Response(JSON.stringify(json), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     } catch (err) {
//       console.error("JSON parse error:", text);
//       return new Response(JSON.stringify({ error: "Invalid JSON from upstream", html: text }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   } catch (err) {
//     console.error("API Fetch failed:", err);
//     return new Response(JSON.stringify({ error: "API call failed" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }




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
