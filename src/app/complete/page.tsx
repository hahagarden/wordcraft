"use client";

import { MainButton, SecondaryButton } from "@/components";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Complete() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const foundScoreRef = useRef(false);

  useEffect(() => {
    // 페이지 로드 시 자동으로 API 호출 시작
    postScore();
  }, []);

  const postScore = async () => {
    setIsLoading(true);
    setMessage("");
    foundScoreRef.current = false;

    // 로컬 스토리지에서 단어와 문장 가져오기
    const storedWords = localStorage.getItem("WORDCRAFT_WORDS");
    const storedSentence = localStorage.getItem("WORDCRAFT_SENTENCE");

    if (!storedWords || !storedSentence) {
      setIsLoading(false);
      alert("단어나 문장이 없습니다. 다시 시도해주세요.");
      return;
    }

    const words = JSON.parse(storedWords);
    const sentence = storedSentence;

    const wordsQuery = encodeURIComponent(words.join(","));
    const sentenceQuery = encodeURIComponent(sentence);

    const eventSource = new EventSource(`/api/score?words=${wordsQuery}&sentence=${sentenceQuery}`);

    eventSource.onmessage = (event) => {
      if (event.data === "시작") return;
      if (event.data === "끝") {
        setIsLoading(false);
        eventSource.close();
        return;
      }

      setMessage((prev) => {
        const newMessage = prev + event.data;
        const formattedMessage = newMessage.replaceAll(/\\n/g, "\n");

        if (!foundScoreRef.current) {
          extractScoreFromMessage(formattedMessage);
        }

        return formattedMessage;
      });
    };

    eventSource.onerror = (error) => {
      console.log("EventSource Error", error);
      eventSource.close();
      setIsLoading(false);
    };

    eventSource.onopen = () => {
      console.log("SSE connection opened");
    };
  };

  // 메시지에서 점수를 추출하는 함수
  const extractScoreFromMessage = (currentMessage: string) => {
    try {
      const scoreMatch = currentMessage.match(/(?:총점):\s*(\d+)(?:점)?/i);
      if (scoreMatch && scoreMatch[1]) {
        const extractedScore = parseInt(scoreMatch[1], 10);
        if (!isNaN(extractedScore)) {
          setScore(extractedScore);
          foundScoreRef.current = true; // 점수를 찾았으므로 플래그 설정
        }
      }
    } catch (error) {
      console.error("점수 파싱 오류:", error);
    }
  };

  return (
    <main className="m-auto flex flex-col items-center gap-8 p-10 overflow-auto">
      <div className="flex flex-col items-center gap-4">
        <span className="text-5xl font-medium">{score ? `${score}점` : isLoading ? "" : "?"}</span>
      </div>

      <div className="w-96 p-6 bg-background rounded-lg min-h-[200px]">
        <div className="whitespace-pre-wrap">{message}</div>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/play">
          <MainButton>한판 더!</MainButton>
        </Link>
        <Link href="/community">
          <SecondaryButton>구경하기</SecondaryButton>
        </Link>
      </div>
    </main>
  );
}
