export async function GET() {
  try {
    const key = "R7THWL8R6GCNENN9";
    const func = "MARKET_STATUS";
    const response = await fetch(
      `https://www.alphavantage.co/query?function=${encodeURIComponent(
        func
      )}&apikey=${encodeURIComponent(key)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "request",
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return null;
  }
}
