// 방명록 비속어 필터 (금칙어 목록 기반)
// 필요에 따라 단어를 추가/삭제하세요.
const BAD_WORDS = [
  "씨발", "시발", "씨바", "시바", "ㅅㅂ", "ㅆㅂ", "병신", "ㅂㅅ",
  "지랄", "ㅈㄹ", "개새", "새끼", "새기", "ㅅㄲ", "좆", "좇", "존나",
  "존나게", "ㅈㄴ", "엿먹", "닥쳐", "꺼져", "썅", "쌍놈", "미친놈",
  "미친년", "또라이", "느금", "니애미", "엠창", "창녀", "걸레",
  "보지", "자지", "섹스", "fuck", "shit", "bitch", "asshole",
];

// 공백·특수문자 제거 후 검사 (우회 방지)
function normalize(text: string) {
  return text.toLowerCase().replace(/[\s.,!?~*\-_]/g, "");
}

export function containsBadWord(text: string): boolean {
  const norm = normalize(text);
  return BAD_WORDS.some((w) => norm.includes(normalize(w)));
}
