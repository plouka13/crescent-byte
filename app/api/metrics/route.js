export async function GET(request) {
  const search = request.nextUrl.search;
  console.log(search);
  try {
    const endpoint = "https://jdktzejo4f.execute-api.ap-southeast-2.amazonaws.com/prod/preproccessing";
    const response = await fetch(
      `${endpoint}${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = await response.json();
    if (responseJson.statusCode === 200) {
      const body = responseJson["body"];
      const dataStr = JSON.parse(body)["data"];
      const dataObj = JSON.parse(dataStr);
      return Response.json(dataObj);
    }
    return Response.json(responseJson);
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error' };
  }
}
