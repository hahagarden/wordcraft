import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `너는 단어 생성기야.
            사물, 사람, 동물, 자연, 문화, 기술, 예술, 과학, 역사, 지리, 식물, 취미, 시사, 경제 중에서 랜덤으로 3개의 주제를 골라 주제에 관련된 단어를 생성할거야.
            `,
          },
          { role: "user", content: `단어 3개를 JSON 형식으로 제공해줘. 예제: {"words": ["고양이", "우주", "탐험"]}` },
        ],
        temperature: 1.0,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "OpenAI API 요청 실패" }, { status: 500 });
    }

    const data = await response.json();
    console.log("gpt data ****", data, data.choices?.[0]?.message?.content);
    const reply = data.choices?.[0]?.message?.content ?? "{}";

    let words;
    try {
      words = JSON.parse(reply).words;
    } catch {
      return NextResponse.json({ error: "응답 파싱 오류" }, { status: 500 });
    }

    return NextResponse.json({ words });
  } catch {
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
