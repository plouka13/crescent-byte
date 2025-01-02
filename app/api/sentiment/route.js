export async function POST(req) {
  try {
    const body = await req.json();
    const res = await fetch("https://kffxjq6hph.execute-api.ap-southeast-2.amazonaws.com/sentiment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body), // Send the parsed request body directly
    });
    const data = await res.json()
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return error;
  }
}