export async function GET() {
  const currentDate = new Date().toISOString().slice(0, 10);

  try {
    const response = await fetch(
      `https://jdktzejo4f.execute-api.ap-southeast-2.amazonaws.com/prod/market_status?market=ASX&start_date=${encodeURIComponent(
        currentDate
      )}&end_date=${encodeURIComponent(currentDate)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
