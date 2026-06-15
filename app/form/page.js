"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formFields, lightingOptions, buildPrompt } from "@/lib/prompts";

export default function FormPage() {
  const router = useRouter();
  const [values, setValues] = useState({ lighting: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const leftLighting = lightingOptions.slice(0, 3);
  const rightLighting = lightingOptions.slice(3, 6);

  const isComplete =
    formFields.every((f) => values[f.id] && values[f.id].trim() !== "") &&
    values.lighting.length > 0;

  const handleChange = (fieldId, value) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleLightingChange = (value, checked) => {
    setValues((prev) => ({
      ...prev,
      lighting: checked
        ? [...prev.lighting, value]
        : prev.lighting.filter((v) => v !== value),
    }));
  };

  const fontStack = "var(--font-anton), 'NexonKart', sans-serif";

  const inputStyle = {
    width: "100%",
    backgroundColor: "white",
    border: "2px solid #FF0099",
    borderRadius: "4px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: fontStack,
    letterSpacing: "0.03em",
  };

  const labelStyle = {
    fontFamily: fontStack,
    fontWeight: "400",
    fontSize: "20px",
    color: "#111",
    marginBottom: "8px",
    display: "block",
    letterSpacing: "0.03em",
  };

  const arrowStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#FF0099",
    pointerEvents: "none",
    fontSize: "12px",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
    paddingRight: "36px",
    appearance: "none",
    WebkitAppearance: "none",
  };

  const handleSubmit = async () => {
    if (!isComplete) return;
    setIsLoading(true);
    setError("");

    const prompt = buildPrompt(values);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("generatedImage", data.image);
      sessionStorage.setItem("prompt", prompt);
      sessionStorage.setItem("artist", values.artist || "");
      sessionStorage.setItem("song", values.song || "");
      router.push("/result");

    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url('/landing_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 상단 타이틀 */}
      <div className="flex justify-center pt-6 pb-4">
        <img
          src="/landing_title.png"
          alt="CONCERT MEMORY"
          style={{ width: "clamp(150px, 30vw, 380px)" }}
        />
      </div>

      {/* 폼 영역 */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          maxWidth: "860px",
          padding: "32px 24px",
          borderRadius: "8px",
          margin: "20px auto 40px",
          width: "calc(100% - 32px)",
        }}
      >
        {/* 반응형 2열 그리드 — 모바일 1열, 데스크탑 2열 */}
        <div className="responsive-grid">

          {/* 왼쪽 열 */}
          <div className="flex flex-col gap-6">

            {/* Artist / Concert */}
            <div>
              <label style={labelStyle}>Artist / Concert</label>
              <input
                type="text"
                placeholder="Enter artist or concert name"
                value={values.artist || ""}
                onChange={(e) => handleChange("artist", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Genre */}
            <div>
              <label style={labelStyle}>Genre</label>
              <div style={{ position: "relative" }}>
                <select
                  value={values.genre || ""}
                  onChange={(e) => handleChange("genre", e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Select genre</option>
                  {formFields
                    .find((f) => f.id === "genre")
                    ?.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                </select>
                <span style={arrowStyle}>▼</span>
              </div>
            </div>

            {/* Song */}
            <div>
              <label style={labelStyle}>Song</label>
              <input
                type="text"
                placeholder="Enter song title"
                value={values.song || ""}
                onChange={(e) => handleChange("song", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* The Moment */}
            <div>
              <label style={labelStyle}>The Moment</label>
              <div style={{ position: "relative" }}>
                <select
                  value={values.moment || ""}
                  onChange={(e) => handleChange("moment", e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Select the moment</option>
                  {formFields
                    .find((f) => f.id === "moment")
                    ?.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                </select>
                <span style={arrowStyle}>▼</span>
              </div>
            </div>

          </div>

          {/* 오른쪽 열 */}
          <div className="flex flex-col gap-6">

            {/* Lighting */}
            <div>
              <label style={labelStyle}>Lighting</label>
              <div className="grid grid-cols-2 gap-2">
                {[...leftLighting, ...rightLighting].map((opt, i) => (
                  <label
                    key={opt.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      fontSize: "17px",
                      fontFamily: fontStack,
                      letterSpacing: "0.03em",
                      gridColumn: i < 3 ? 1 : 2,
                      gridRow: (i % 3) + 1,
                    }}
                  >
                    <input
                      type="checkbox"
                      value={opt.value}
                      checked={values.lighting.includes(opt.value)}
                      onChange={(e) =>
                        handleLightingChange(opt.value, e.target.checked)
                      }
                      style={{
                        width: "18px",
                        height: "18px",
                        accentColor: "#FF0099",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Where I Stood */}
            <div>
              <label style={labelStyle}>Where I Stood</label>
              <div style={{ position: "relative" }}>
                <select
                  value={values.position || ""}
                  onChange={(e) => handleChange("position", e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Select your position</option>
                  {formFields
                    .find((f) => f.id === "position")
                    ?.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                </select>
                <span style={arrowStyle}>▼</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Notes</label>
              <textarea
                placeholder={"More details, better results.\nex) It was raining, my friend next to me was crying..."}
                value={values.extra || ""}
                onChange={(e) => handleChange("extra", e.target.value)}
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "none",
                  lineHeight: "1.6",
                }}
              />
            </div>

          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "16px", fontFamily: fontStack }}>
            {error}
          </p>
        )}

        {/* 제출 버튼 */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isLoading}
            className="w-full md:w-auto"
            style={{
              fontFamily: fontStack,
              backgroundColor: isComplete && !isLoading ? "#FF0099" : "#ccc",
              color: "white",
              border: "none",
              padding: "14px 60px",
              fontSize: "18px",
              letterSpacing: "0.05em",
              borderRadius: "4px",
              cursor: isComplete && !isLoading ? "pointer" : "not-allowed",
            }}
          >
            {isLoading ? "CREATING YOUR MEMORY..." : "GENERATE MEMORY"}
          </button>

          {isLoading && (
            <p style={{
              color: "#666",
              fontSize: "13px",
              marginTop: "12px",
              fontFamily: fontStack,
              letterSpacing: "0.03em",
            }}>
              This may take 20-30 seconds
            </p>
          )}
        </div>

      </div>
    </main>
  );
}