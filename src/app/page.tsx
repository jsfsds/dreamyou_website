"use client";

import Image from "next/image";
import { useState } from "react";
import DayButtonIcon from "@/components/icons/DayButton";
import NightButtonIcon from "@/components/icons/NightButton";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const [activeMobileTab, setActiveMobileTab] = useState<"blockABC" | "blockD">("blockABC");
  const appRepoUrl = "https://github.com/jsfsds/dreamyou_frontend_expo";

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-24 sm:pt-8 sm:pb-0 border border-white">
      <div className="absolute top-8 right-8 sm:top-12 sm:right-20 z-10 transform scale-90 sm:scale-100">
        <ThemeToggleButton />
      </div>

      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start justify-center w-full max-w-7xl mt-10 px-4 sm:px-0">
        <div
          className={`w-full sm:w-120 ${activeMobileTab === "blockD" ? "hidden sm:flex" : "flex"} flex-col gap-3 justify-center items-center`}
        >
          <div className="w-full sm:h-3/8 rounded flex items-center justify-center py-4 sm:py-0">
            <Image
              src="/ASSETS/png/dreampal.png"
              alt="DreamPal"
              width={180}
              height={90}
              className="object-contain max-h-full"
            />
          </div>

          <div className="w-full sm:h-3/8 rounded flex items-center justify-center py-4 sm:py-0">
            {theme === "light" ? (
              <Image
                src="/ASSETS/png/day.png"
                alt="DreamPal day mode"
                width={300}
                height={300}
                className="object-contain max-h-full transition-all duration-500 breath-animation sm:w-auto sm:h-auto"
              />
            ) : (
              <Image
                src="/ASSETS/png/night.png"
                alt="DreamPal night mode"
                width={300}
                height={300}
                className="object-contain max-h-full transition-all duration-500 breath-animation sm:w-auto sm:h-auto"
              />
            )}
          </div>

          <div className="w-full mt-0 sm:h-1/4 rounded flex items-center justify-center py-4 sm:py-0 sm:mt-10">
            <a
              href={appRepoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="查看 DreamYou Expo App 仓库"
              className={`transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none inline-block cursor-pointer ${
                theme === "dark" ? "hover:scale-110" : ""
              }`}
            >
              {theme === "light" ? (
                <DayButtonIcon className="w-[200px] h-auto sm:w-[240px] sm:h-[80px]" />
              ) : (
                <NightButtonIcon className="w-[200px] h-auto sm:w-[240px] sm:h-[80px]" />
              )}
            </a>
          </div>
        </div>

        <div
          className={`w-full sm:w-224 min-h-[300px] sm:min-h-0 sm:h-126 ${activeMobileTab === "blockABC" ? "hidden sm:flex" : "flex"} items-center justify-center overflow-hidden`}
        >
          <video
            key={theme + activeMobileTab}
            className="w-full h-full object-cover"
            src="/ASSETS/video.mp4"
            poster="/ASSETS/png/cover.png"
            controls
            preload="metadata"
          >
            您的浏览器不支持 HTML5 video 标签。
          </video>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-5 sm:hidden z-20 p-2 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-sm shadow-lg">
        <button
          onClick={() => setActiveMobileTab("blockABC")}
          aria-label="下载视图"
          className={`p-2.5 w-20 h-10 rounded-full text-sm font-medium flex items-center justify-center transition-colors duration-200 ${
            activeMobileTab === "blockABC"
              ? theme === "light"
                ? "bg-[#FFBDDA] text-gray-800"
                : "bg-[#C0DBF9] text-gray-800"
              : "bg-transparent text-gray-500 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-700/70"
          }`}
        >
          下载
        </button>
        <button
          onClick={() => setActiveMobileTab("blockD")}
          aria-label="视频视图"
          className={`p-2.5 w-20 h-10 rounded-full text-sm font-medium flex items-center justify-center transition-colors duration-200 ${
            activeMobileTab === "blockD"
              ? theme === "light"
                ? "bg-[#FFBDDA] text-gray-800"
                : "bg-[#C0DBF9] text-gray-800"
              : "bg-transparent text-gray-500 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-700/70"
          }`}
        >
          视频
        </button>
      </div>
    </main>
  );
}
