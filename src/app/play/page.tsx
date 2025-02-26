import { MainButton, SmallButton } from "@/components";

export default function Play() {
  return (
    <div className="m-auto flex flex-col justify-center gap-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-center">다음 단어를 사용해 문장을 만들어보세요!</p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="h-10 flex items-center bg-blue-400 text-white px-4 rounded-sm">고양이</span>
          <span className="h-10 flex items-center bg-green-500 text-white px-4 rounded-sm">우주</span>
          <span className="h-10 flex items-center bg-red-400 text-white px-4 rounded-sm">탐험</span>
        </div>
        <SmallButton>단어 바꾸기 (5/5)</SmallButton>
      </div>

      <div className="flex flex-col items-center gap-4">
        <textarea className="w-96 p-4 border rounded-lg bg-background" />
        <MainButton customClassName="w-40">완성</MainButton>
      </div>
    </div>
  );
}
