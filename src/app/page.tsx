import { MainButton, SecondaryButton } from "@/components";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a href="/play">
          <MainButton>게임 시작하기</MainButton>
        </a>
        <a href="/community">
          <SecondaryButton>구경하기</SecondaryButton>{" "}
        </a>
      </div>
    </main>
  );
}
