import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 없습니다." },
        { status: 400 }
      );
    }

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      n: 1,
      size: "1536x1024",
      quality: "medium",
    });

    const imageBase64 = response.data[0].b64_json;

    return NextResponse.json({ image: imageBase64 });

  } catch (error) {
    console.error("이미지 생성 오류:", error);
    return NextResponse.json(
      { error: "이미지 생성에 실패했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}