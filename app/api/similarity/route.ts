import { NextRequest, NextResponse } from "next/server";

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

function cosineSim(sentence: string, paragraphs: string[]) {
    // Function to calculate the dot product of two vectors
    function dotProduct(vec1: number[], vec2: number[]): number {
        let result = 0;
        for (let i = 0; i < vec1.length; i++) {
            result += vec1[i] * vec2[i];
        }
        return result;
    }

    // Function to calculate the magnitude of a vector
    function magnitude(vec: number[]): number {
        let sum = 0;
        for (let value of vec) {
            sum += value * value;
        }
        return Math.sqrt(sum);
    }

    // Function to calculate cosine similarity between two vectors
    function cosineSimilarity(vec1: number[], vec2: number[]): number {
        const dot = dotProduct(vec1, vec2);
        const mag1 = magnitude(vec1);
        const mag2 = magnitude(vec2);

        if (mag1 === 0 || mag2 === 0) {
            return 0; // Avoid division by zero
        }

        return dot / (mag1 * mag2);
    }

    // Function to convert a text into a vector of word frequencies
    function textToVector(text: string, vocabulary: string[]): number[] {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const vector = Array.from({ length: vocabulary.length }, () => 0);

        for (let word of words) {
            const index = vocabulary.indexOf(word);
            if (index !== -1) {
                vector[index]++;
            }
        }

        return vector;
    }

    // Example usage

    // Create a vocabulary from both the sentence and paragraph
    const similarities: number[] = [];
    paragraphs.forEach((paragraph) => {
        const combinedText = sentence + " " + paragraph;
        const vocabulary = Array.from(
            new Set(combinedText.toLowerCase().match(/\b\w+\b/g) || [])
        );

        // Convert the sentence and paragraph into vectors
        const sentenceVector = textToVector(sentence, vocabulary);
        const paragraphVector = textToVector(paragraph, vocabulary);

        // Calculate cosine similarity
        const similarity = cosineSimilarity(sentenceVector, paragraphVector);

        similarities.push(similarity);
    });
    return similarities;
}

async function hf(sentence: string, paragraphs: string[]) {
    const api_token = process.env.HUGGING_FACE_API_KEY;
    const model =
        "https://api-inference.huggingface.co/models/DrishtiSharma/sentence-t5-large-quora-text-similarity";
    const res = await fetch(model, {
        method: "POST",
        headers: { Authorization: `Bearer ${api_token}` },
        body: JSON.stringify({
            inputs: {
                source_sentence: sentence,
                sentences: paragraphs,
            },
        }),
    });
    const data = await res.json();
    console.log(data);
    return data;
}
