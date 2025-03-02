import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const words = searchParams.get("words");
  const sentence = searchParams.get("sentence");

  if (!words || !sentence) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `
                  너는 문장을 채점하는 채점기야. 3개의 주어진 단어인 ${words}를 모두 사용했으면 채점을 진행하고 그렇지 않으면 총점 0점과 사용하지 않는 단어를 알려주고, '주어진 단어를 모두 사용하지 않았어요' 라는 답변을 줘.
                  그리고 채점은 1. 창의적인 문장인지, 2. 말이 되는 문장인지, 고급스러운 문장인지, 3. 재치있는 문장인지 관점에서 각 항목당 100점 만점으로 채점해주고 총점은 평균점수야.
                `,
              },
              {
                role: "system",
                content: `
                  답변 형식은 다음 예시와 같아.

                  총점: 73점

                  창의성: 77점
                  설명

                  문장력: 68점
                  설명

                  재치성: 75점
                  설명
                `,
              },
              {
                role: "user",
                content: `사용자가 주어진 단어를 사용하여 만든 문장은 다음과 같아. ${sentence}`,
              },
            ],
            stream: true,
          }),
        });

        if (!response.ok) {
          throw new Error(`API 응답 오류: ${response.status}`);
        }

        if (!response.body) {
          throw new Error("응답 본문이 없습니다");
        }

        const reader = response.body.getReader(); // 스트리밍 읽기
        const decoder = new TextDecoder();

        controller.enqueue(encoder.encode("data: 시작\n\n")); // 데이터 시작 알림

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ") && !line.includes("[DONE]")) {
              try {
                const data = JSON.parse(line.replace("data: ", ""));
                const content = data.choices[0]?.delta?.content || ""; // 유효데이터만 추출
                if (content) {
                  const safeContent = content.replaceAll(/\n/g, "\\n");
                  controller.enqueue(encoder.encode(`data: ${safeContent}\n\n`)); // SSE 포맷으로 변환
                }
              } catch (err) {
                console.error("JSON Parse Error:", err);
              }
            }
          }
        }

        controller.enqueue(encoder.encode("data: 끝\n\n")); // 데이터 끝 알림
      } catch (error: unknown) {
        console.error("Stream error:", error);
        const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
        controller.enqueue(encoder.encode(`data: API 오류가 발생했습니다: ${errorMessage}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
