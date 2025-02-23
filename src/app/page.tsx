export default function Home() {
  return (
    <div className="flex items-center justify-center gap-16 font-[family-name:var(--font-geist-sans)] overflow-auto border border-foreground">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/play"
          >
            게임 시작하기
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-[#1a1a1a] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/community"
          >
            구경하기
          </a>
        </div>
      </main>
    </div>
  );
}
