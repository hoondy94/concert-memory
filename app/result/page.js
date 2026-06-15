"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState("");
  const [prompt, setPrompt] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");

  useEffect(() => {
    const img = sessionStorage.getItem("generatedImage");
    const p = sessionStorage.getItem("prompt");
    const a = sessionStorage.getItem("artist");
    const s = sessionStorage.getItem("song");
    if (!img) {
      router.push("/");
      return;
    }
    setImageBase64(img);
    setPrompt(p || "");
    setArtist(a || "");
    setSong(s || "");
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageBase64}`;
    link.download = "my-concert-memory.png";
    link.click();
  };

  const fontStack = "var(--font-anton), 'NexonKart', sans-serif";

  if (!imageBase64) return null;

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url('/landing_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "32px 16px",
        boxSizing: "border-box",
        fontFamily: fontStack,
      }}
    >
      {/* 상단 타이틀 이미지 */}
      <div className="flex justify-center mb-8">
        <img
          src="/result_title.png"
          alt="How close is it?"
          style={{ width: "clamp(200px, 50vw, 700px)" }}
        />
      </div>

      {/* 반응형 2열 그리드 */}
      <div
        className="responsive-grid mx-auto"
        style={{ maxWidth: "1100px", width: "calc(100% - 32px)" }}
      >
        {/* 왼쪽 — 이미지 + 프레임 + 아티스트/곡명 */}
        <div className="flex flex-col">

          {/* 이미지 + 프레임 겹치기 */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            {/* 분홍 프레임 */}
            <img
              src="/result_rectangle.png"
              alt="frame"
              style={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />

            {/* 생성된 이미지 */}
            <img
              src={`data:image/png;base64,${imageBase64}`}
              alt="재현된 공연 기억"
              style={{
                position: "relative",
                width: "100%",
                display: "block",
                zIndex: 1,
              }}
            />
          </div>

          {/* 아티스트 / 곡명 핑크 박스 */}
          {(artist || song) && (
            <div
              style={{
                backgroundColor: "#FF0099",
                padding: "15px 20px",
                marginLeft: "10px",
                marginRight: "10px",
                fontFamily: fontStack,
              }}
            >
              {artist && (
                <p
                  style={{
                    color: "white",
                    fontFamily: fontStack,
                    fontSize: "18px",
                    margin: 0,
                    letterSpacing: "0.03em",
                  }}
                >
                  {artist}
                </p>
              )}
              {song && (
                <p
                  style={{
                    color: "white",
                    fontFamily: fontStack,
                    fontSize: "14px",
                    margin: "6px 0 0 0",
                    letterSpacing: "0.03em",
                  }}
                >
                  ♪ {song}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 오른쪽 — 프롬프트 박스 + 버튼 */}
        <div className="flex flex-col gap-5">

          {/* 프롬프트 텍스트 박스 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "24px",
              borderRadius: "4px",
              maxHeight: "420px",
              overflowY: "auto",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#333",
                lineHeight: "1.8",
                margin: 0,
                fontFamily: fontStack,
              }}
            >
              {prompt}
            </p>
          </div>

          {/* 버튼 2열 고정 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                fontFamily: fontStack,
                backgroundColor: "white",
                color: "#FF0099",
                border: "2px solid #FF0099",
                padding: "12px 0",
                fontSize: "15px",
                letterSpacing: "0.03em",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              저장하기
            </button>
            <button
              onClick={() => router.push("/")}
              style={{
                fontFamily: fontStack,
                backgroundColor: "white",
                color: "#FF0099",
                border: "2px solid #FF0099",
                padding: "12px 0",
                fontSize: "15px",
                letterSpacing: "0.03em",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              시작 화면으로
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}