"use client";

import { MainButton, SmallButton } from "@/components";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import Link from "next/link";

const DEFAULT_WORDS = ["고양이", "우주", "탐험"];

export default function Play() {
  const [words, setWords] = useLocalStorageState("WORDCRAFT_WORDS", DEFAULT_WORDS);

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
        <textarea className="w-96 p-4 border rounded-lg bg-background" />
        <Link href="/complete">
          <MainButton customClassName="w-40">완성</MainButton>
        </Link>
      </div>
    </div>
  );
}
