export const formFields = [
  {
    id: "artist",
    label: "Artist / Concert",
    type: "text",
    placeholder: "Enter artist or concert name",
  },
  {
    id: "genre",
    label: "Genre",
    type: "select",
    options: [
      { label: "Indie / Alternative", value: "indie alternative" },
      { label: "K-Pop", value: "K-pop" },
      { label: "Rock", value: "rock" },
      { label: "Classical", value: "classical" },
      { label: "Jazz", value: "jazz" },
      { label: "Hip-Hop", value: "hip-hop" },
    ],
  },
  {
    id: "song",
    label: "Song",
    type: "text",
    placeholder: "Enter song title",
  },
  {
    id: "moment",
    label: "The Moment",
    type: "select",
    options: [
      { label: "When the intro began", value: "the moment the intro began" },
      { label: "When the crowd sang together", value: "the crowd singing together" },
      { label: "A moment of silence", value: "a moment of complete silence" },
      { label: "The climax", value: "the climax of the performance" },
      { label: "When the encore started", value: "when the encore started" },
    ],
  },
  {
    id: "position",
    label: "Where I Stood",
    type: "select",
    options: [
      { label: "Front row", value: "front row" },
      { label: "Middle of the crowd", value: "middle of the standing crowd" },
      { label: "Far back", value: "far back in the crowd" },
      { label: "Seated", value: "seated in the audience" },
      { label: "Side of the stage", value: "side of the stage" },
    ],
  },
];

export const lightingOptions = [
  { label: "Cold blue", value: "cold blue spotlight" },
  { label: "Warm golden", value: "warm golden light" },
  { label: "White strobe", value: "white strobe lights" },
  { label: "Vivid green", value: "vivid green light" },
  { label: "Intense red", value: "intense red stage lighting" },
  { label: "Deep purple", value: "deep purple haze" },
];

export function buildPrompt(values) {
  const lightingStr = Array.isArray(values.lighting)
    ? values.lighting.join(" and ")
    : values.lighting;

  const extraText = values.extra ? `, ${values.extra}` : "";

  return `A blurry crowd-perspective photo taken from inside a ${values.genre} concert, ${lightingStr}, ${values.moment}, shot from ${values.position}, viewer is standing among the crowd with heads and raised hands filling the lower frame, band barely visible through the crowd, shot on a cheap smartphone held at crowd level, severe soft focus and gaussian blur across the entire image, heavy analog film grain and noise texture, stage lights bleeding and flaring across the frame, purple and warm light haze filling the venue, slightly tilted handheld angle, motion blur, intentionally soft focus and out of focus, raw unpolished snapshot aesthetic, fleeting moment, emotional live music atmosphere, do not render any text letters words subtitles captions or watermarks in the image, while referring to the diary written as following; ${extraText}`;
}