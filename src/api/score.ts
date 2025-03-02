/**
 * 점수 API 관련 함수들을 정의합니다.
 */

/**
 * 문장과 단어를 받아 점수를 계산하는 함수입니다.
 * @param {string[]} words - 평가할 단어 배열
 * @param {string} sentence - 평가할 문장
 * @returns {EventSource} 서버 센트 이벤트 소스 객체
 */
export const getScoreStream = (words: string[], sentence: string): EventSource => {
  const wordsQuery = encodeURIComponent(words.join(","));
  const sentenceQuery = encodeURIComponent(sentence);

  return new EventSource(`/api/score?words=${wordsQuery}&sentence=${sentenceQuery}`);
};

/**
 * 로컬 스토리지에서 단어와 문장을 가져옵니다.
 * @returns {{ words: string[] | null, sentence: string | null }} 저장된 단어와 문장
 */
export const getStoredWordsAndSentence = () => {
  const storedWords = localStorage.getItem("WORDCRAFT_WORDS");
  const storedSentence = localStorage.getItem("WORDCRAFT_SENTENCE");

  return {
    words: storedWords ? JSON.parse(storedWords) : null,
    sentence: storedSentence,
  };
};

/**
 * 메시지에서 점수를 추출하는 함수
 * @param {string} message - 분석할 메시지
 * @returns {number | null} 추출된 점수 또는 null
 */
export const extractScoreFromMessage = (message: string): number | null => {
  try {
    const scoreMatch = message.match(/(?:총점):\s*(\d+)(?:점)?/i);
    if (scoreMatch && scoreMatch[1]) {
      const extractedScore = parseInt(scoreMatch[1], 10);
      if (!isNaN(extractedScore)) {
        return extractedScore;
      }
    }
    return null;
  } catch (error) {
    console.error("점수 파싱 오류:", error);
    return null;
  }
};
