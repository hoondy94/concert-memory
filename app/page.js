"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/landing_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center gap-16">

        {/* 타이틀 이미지 */}
        <img
          src="/landing_title.png"
          alt="CONCERT MEMORY"
          style={{ width: "clamp(300px, 80vw, 1000px)" }}
        />

        {/* 시작하기 버튼 이미지 */}
        <button
          onClick={() => router.push("/form")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            marginTop: "40px",
          }}
        >
          <img
            src="/landing_start.png"
            alt="시작하기"
            style={{ width: "clamp(120px, 15vw, 220px)" }}
          />
        </button>

      </div>
    </main>
  );
}