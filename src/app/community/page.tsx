import { MainButton } from "@/components";
import Link from "next/link";
import { getSentences } from "@/lib/sentences";

export default async function Page() {
  const sentences = await getSentences();

  return (
    <div className="w-full m-[0_auto] flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 h-full overflow-auto">
        {sentences.map((sentence) => (
          <div key={sentence.id} className="bg-background text-foreground p-4 rounded-xl border">
            <p>
              {sentence.sentence} ({sentence.words.join(", ")})
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/play">
          <MainButton>게임하러 가기</MainButton>
        </Link>
      </div>
    </div>
  );
}
