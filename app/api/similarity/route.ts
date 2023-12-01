import { NextRequest, NextResponse } from "next/server";
import { cosineSim, hf } from "../lib/similarity";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const { prompt, paragraphs }: { prompt: string; paragraphs: string[] } =
            payload;
        const data = {
            cosine_similarity: cosineSim(prompt, paragraphs),
            text_similarity: await hf(prompt, paragraphs),
        };
        return NextResponse.json({ data: data }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
