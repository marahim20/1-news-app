export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.prompt;
  var url =
    "https://newsapi.org/v2/everything?" +
    `q=${prompt}&` +
    "sortBy=popularity&" +
    "apiKey=" +
    process.env.NEWS_API_KEY;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return new Response(JSON.stringify(data));
}
