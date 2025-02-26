import { MainButton } from "@/components";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full m-[0_auto] flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 h-full overflow-auto">
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            nice to meet you <strong>(95점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            고양이가 우주에서 탐험을 하고 있습니다 <strong>(10점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            아무 단어나 사용해서 문장 만들어볼래요 <strong>(80점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            nice to meet you <strong>(95점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            고양이가 우주에서 탐험을 하고 있습니다 <strong>(10점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            아무 단어나 사용해서 문장 만들어볼래요 <strong>(80점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            nice to meet you <strong>(95점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            고양이가 우주에서 탐험을 하고 있습니다 <strong>(10점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            아무 단어나 사용해서 문장 만들어볼래요 <strong>(80점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            nice to meet you <strong>(95점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            고양이가 우주에서 탐험을 하고 있습니다 <strong>(10점)</strong>
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <p>
            아무 단어나 사용해서 문장 만들어볼래요 <strong>(80점)</strong>
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Link href="/play">
          <MainButton>게임하러 가기</MainButton>
        </Link>
      </div>
    </div>
  );
}
