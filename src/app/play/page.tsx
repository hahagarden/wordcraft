"use client";

import { MainButton, SmallButton } from "@/components";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEFAULT_WORDS = ["고양이", "우주", "탐험"];

export default function Play() {
  const router = useRouter();
  const [words, setWords] = useLocalStorageState("WORDCRAFT_WORDS", DEFAULT_WORDS);
  const [sentence, setSentence] = useState("");

  const getWords = async () => {
    const res = await fetch("/api/words");
    const data = await res.json();

    if (data.words) {
      return data.words;
    } else {
      alert("단어를 불러오는데 실패했어요.");
    }
  };

  const resetWords = async () => {
    const words = await getWords();

    setWords(words);
  };

  const handleSentenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSentence(e.target.value);
  };

  // 문장을 로컬 스토리지에 저장하고 결과 페이지로 이동
  const handleComplete = () => {
    if (sentence.trim() === "") {
      alert("문장을 입력해주세요!");
      return;
    }

    // 모든 단어가 포함되어 있는지 체크
    const allWordsIncluded = words.every((word) => sentence.toLowerCase().includes(word.toLowerCase()));

    if (!allWordsIncluded) {
      alert("모든 단어를 사용해주세요!");
      return;
    }

    localStorage.setItem("WORDCRAFT_SENTENCE", sentence);
    router.push("/complete");
  };

  return (
    <div className="m-auto flex flex-col justify-center gap-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-center">다음 단어를 사용해 문장을 만들어보세요!</p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="h-10 flex items-center bg-blue-400 text-white px-4 rounded-sm">{words[0]}</span>
          <span className="h-10 flex items-center bg-green-500 text-white px-4 rounded-sm">{words[1]}</span>
          <span className="h-10 flex items-center bg-red-400 text-white px-4 rounded-sm">{words[2]}</span>
        </div>
        <SmallButton onClick={resetWords}>단어 바꾸기 (5/5)</SmallButton>
      </div>

      <div className="flex flex-col items-center gap-4">
        <textarea
          className="w-96 p-4 border rounded-lg bg-background"
          value={sentence}
          onChange={handleSentenceChange}
          placeholder="위의 단어들을 모두 사용하여 문장을 만들어보세요"
        />
        <MainButton customClassName="w-40" onClick={handleComplete}>
          완성
        </MainButton>
      </div>
    </div>
  );
}
