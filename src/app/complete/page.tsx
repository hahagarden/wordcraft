import { MainButton, SecondaryButton } from "@/components";
import Link from "next/link";

export default function Complete() {
  return (
    <main className="m-auto flex flex-col items-center gap-8 p-10 overflow-auto">
      <div className="flex flex-col items-center gap-4">
        <span>제 점수는요 . . .</span>
        <span className="text-5xl font-medium">68점</span>
      </div>

      <div className="w-96">
        <p className="mb-4">
          창의성:{" "}
          <strong data-start="5" data-end="12">
            70점
          </strong>
          <br />
          뱀꿈 → 피아노 연주 → 공기청정기 반응이라는 흐름이 자연스럽지만, 다소 일상적인 전개라서 더 독창적인 발상이
          들어가면 좋을 것 같아요. 예를 들어, 뱀과 피아노, 공기청정기의 관계를 더 기묘하거나 예상치 못한 방식으로 엮으면
          창의성이 올라갈 듯해요.
        </p>
        <p className="mb-4">
          고급스러움:{" "}
          <strong data-start="166" data-end="173">
            60점
          </strong>
          <br />
          문장은 전체적으로 부드럽고 자연스럽지만, 단어 선택이 다소 평이해요. 조금 더 세련된 표현이나 문학적인 요소를
          가미하면 점수가 올라갈 거예요.
        </p>
        <p className="mb-4">
          재치:{" "}
          <strong data-start="263" data-end="270">
            75점
          </strong>
          <br />
          공기청정기의 빨간불을 보고 ‘피아노에 먼지가 많았나’라고 생각하는 부분이 소소한 유머 요소로 작용해서 재치 있는
          느낌을 줍니다. 하지만 더 반전 요소나 의외성이 들어가면 더 높은 점수를 받을 수 있어요.
        </p>
        <p className="mb-4">
          <strong data-start="390" data-end="401">
            총점: 68점
          </strong>
          <br />꽤 자연스럽고 재치 있는 문장이지만, 좀 더 기발한 연결고리나 고급스러운 표현이 추가되면 더 높은 점수를
          받을 수 있을 것 같아요!
        </p>
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
