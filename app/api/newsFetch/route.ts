export async function GET(req: Request) {
  const prompt = req.url.split("?")[1];
  const prompt2 = prompt.split("=")[1];
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
