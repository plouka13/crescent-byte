export async function GET(request) {
  const inputValue = request.nextUrl.searchParams.get("symbol");
  try {
    const res = await fetch(
      `https://jdktzejo4f.execute-api.ap-southeast-2.amazonaws.com/prod/ai_trade_analysis?symbol=${encodeURIComponent(
        inputValue
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return error;
  }
}
