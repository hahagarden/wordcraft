"use client";

import { MainButton, SecondaryButton } from "@/components";
import { getScoreStream, getStoredWordsAndSentence, extractScoreFromMessage, getWords } from "@/api";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useFetch } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Complete() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const foundScoreRef = useRef(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const { fetchData: fetchResetWords } = useFetch(getWords);

  useEffect(() => {
    // 이미 채점이 완료되었는지 확인
    const { words, sentence } = getStoredWordsAndSentence();
    if (!words || !sentence) {
      router.replace("/play");
      return;
    }

    // 페이지 로드 시 자동으로 API 호출 시작
    fetchScore();

    // Clean up 함수
    return () => {
      // EventSource가 있다면 닫기
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const resetWords = async () => {
    try {
      const newWords = await fetchResetWords();
      localStorage.setItem("WORDCRAFT_WORDS", JSON.stringify(newWords));
    } catch (error) {
      console.error(error);
      alert("단어를 불러오는데 실패했어요.");
    }
  };

  // 페이지 로드 시 실행할 함수
  const fetchScore = async () => {
    setIsLoading(true);
    setMessage("");
    foundScoreRef.current = false;

    // 로컬 스토리지에서 단어와 문장 가져오기
    const { words, sentence } = getStoredWordsAndSentence();

    if (!words || !sentence) {
      setIsLoading(false);
      alert("단어나 문장이 없습니다. 다시 시도해주세요.");
      return;
    }

    // EventSource 생성 및 이벤트 처리
    const eventSource = getScoreStream(words, sentence);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      if (event.data === "시작") return;
      if (event.data === "끝") {
        setIsLoading(false);
        eventSource.close();
        // 채점이 완료되면 로컬 스토리지의 문장 데이터 삭제
        localStorage.removeItem("WORDCRAFT_SENTENCE");
        // 단어 초기화
        resetWords();
        return;
      }

      setMessage((prev) => {
        const newMessage = prev + event.data;
        const formattedMessage = newMessage.replaceAll(/\\n/g, "\n");

        if (!foundScoreRef.current) {
          const extractedScore = extractScoreFromMessage(formattedMessage);
          if (extractedScore !== null) {
            setScore(extractedScore);
            foundScoreRef.current = true;
          }
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
