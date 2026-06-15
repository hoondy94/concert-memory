// lib/prompts.js

export const formFields = [
  {
    id: "genre",
    label: "음악 장르",
    type: "select",
    options: [
      { label: "인디 / 얼터너티브", value: "indie alternative" },
      { label: "케이팝", value: "K-pop" },
      { label: "록", value: "rock" },
      { label: "클래식", value: "classical" },
      { label: "재즈", value: "jazz" },
      { label: "힙합", value: "hip-hop" },
    ],
  },
  {
    id: "lighting",
    label: "조명 색감",
    type: "select",
    options: [
      { label: "차가운 파란빛", value: "cold blue spotlight" },
      { label: "따뜻한 노란빛", value: "warm golden light" },
      { label: "강렬한 붉은빛", value: "intense red stage lighting" },
      { label: "보랏빛", value: "deep purple haze" },
      { label: "흰 섬광", value: "white strobe lights" },
    ],
  },
  {
    id: "moment",
    label: "그 순간",
    type: "select",
    options: [
      { label: "전주가 시작되던", value: "the moment the intro began" },
      { label: "떼창이 터지던", value: "the crowd singing together" },
      { label: "완전히 조용해지던", value: "a moment of complete silence" },
      { label: "클라이맥스의", value: "the climax of the performance" },
      { label: "앙코르가 시작되던", value: "when the encore started" },
    ],
  },
  {
    id: "position",
    label: "내가 있던 위치",
    type: "select",
    options: [
      { label: "맨 앞줄", value: "front row" },
      { label: "스탠딩 한가운데", value: "middle of the standing crowd" },
      { label: "뒤쪽 어딘가", value: "far back in the crowd" },
      { label: "좌석에 앉아", value: "seated in the audience" },
      { label: "사이드", value: "side of the stage" },
    ],
  },
];

export function buildPrompt(values) {
  return `Inside a ${values.genre} concert, 
${values.lighting}, 
${values.moment}, 
shot from ${values.position}, 
crowd visible, live performance energy, 
cinematic, motion blur on crowd, 
emotional atmosphere, concert photography style, 
photorealistic, high detail`;
}