/**
 * 단어 API 관련 함수들을 정의합니다.
 */

/**
 * 랜덤 단어 3개를 서버에서 가져옵니다.
 * @returns {Promise<string[]>} 랜덤 단어 배열
 */
export const getWords = async (): Promise<string[]> => {
  try {
    const res = await fetch("/api/words");
    const data = await res.json();

    if (data.words) {
      return data.words;
    } else {
      throw new Error("단어 데이터가 없습니다.");
    }
  } catch (error) {
    console.error("단어를 불러오는데 실패했습니다:", error);
    throw error;
  }
};
