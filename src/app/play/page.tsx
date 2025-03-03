"use client";

import { MainButton, SmallButton, Spinner } from "@/components";
import { getWords } from "@/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFetch, useLocalStorageState } from "@/hooks";
import { saveSentence } from "@/lib/sentences";

interface Chances {
  lastUpdated: string;
  chances: number;
}

const DEFAULT_WORDS = ["고양이", "우주", "탐험"];
const DEFAULT_CHANCES = 5;

export default function Play() {
  const router = useRouter();
  const [words, setWords] = useLocalStorageState("WORDCRAFT_WORDS", DEFAULT_WORDS);
  const [sentence, setSentence] = useState("");
  const [chances, setChances] = useLocalStorageState<Chances>("WORDCRAFT_CHANCES", {
    lastUpdated: new Date().toDateString(),
    chances: DEFAULT_CHANCES,
  });

  const { fetchData: fetchResetWords, isLoading: isLoadingFetchResetWords } = useFetch(getWords);

  // 단어 교체 기회 차감
  const decreaseChances = () => {
    setChances(() => ({
      lastUpdated: new Date().toDateString(),
      chances: chances.chances - 1,
    }));
  };

  // 날짜가 바뀌었으면 초기화 여부 true
  const shouldResetChances = () => {
    const lastUpdated = chances.lastUpdated;
    const today = new Date().toDateString();
    return lastUpdated !== today;
  };

  const resetWords = async () => {
    try {
      const newWords = await fetchResetWords();
      setWords(newWords);
    } catch (error) {
      console.error(error);
      alert("단어를 불러오는데 실패했어요.");
    }
  };

  // 단어 교체
  const handleClickResetWords = async () => {
    if (chances.chances <= 0) {
      alert("기회를 모두 소진했어요.");
      return;
    }

    await resetWords();

    // 날짜 바뀌었으면 기회 초기화
    if (shouldResetChances()) {
      setChances(() => ({
        lastUpdated: new Date().toDateString(),
        chances: DEFAULT_CHANCES,
      }));
    }

    decreaseChances();
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
    saveSentence(sentence, words);
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
        <SmallButton onClick={handleClickResetWords} customClassName="w-36">
          {isLoadingFetchResetWords ? (
            <Spinner customClassName="w-4 h-4" />
          ) : (
            `단어 바꾸기 (${chances.chances}/${DEFAULT_CHANCES})`
          )}
        </SmallButton>
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
