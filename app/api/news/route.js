export async function GET(request) {
  const inputValue = request.nextUrl.searchParams.get("symbol");
  try {
    const response = await fetch(
      `https://ittzv8qt82.execute-api.ap-southeast-2.amazonaws.com/dev/data/news?stockSymbol=${encodeURIComponent(
        inputValue
      )}`,
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
    return { error: 'Internal Server Error' }; // Return an error response
  }
}
