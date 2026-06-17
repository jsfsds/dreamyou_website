"use client"

import Image from "next/image";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { useTheme } from "@/context/ThemeContext";
import DayButtonIcon from "@/components/icons/DayButton";
// MoonIcon is imported but not used, so it can be commented out or removed.
// import MoonIcon from "@/components/icons/MoonIcon"; 
import NightButtonIcon from "@/components/icons/NightButton";
import { useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [activeMobileTab, setActiveMobileTab] = useState<'blockABC' | 'blockD'>('blockABC');

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-24 sm:pt-8 sm:pb-0 border border-white">

      {/* 右上角切换按钮容器 - Responsive styles added */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-20 z-10 transform scale-90 sm:scale-100">
        <ThemeToggleButton />
      </div>

      {/* 中间两个有间隔的容器 - Adjusted for mobile: flex-col, sm:flex-row */}
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start justify-center w-full max-w-7xl mt-10 px-4 sm:px-0">
        
        {/* Block ABC (Containers A, B, C) - Conditional rendering for mobile */}
        <div
          className={`w-full sm:w-120 ${activeMobileTab === 'blockD' ? 'hidden sm:flex' : 'flex'} flex-col gap-3 justify-center items-center`}
        >
          {/* 容器A 放置dreampal.png */}
          <div className="w-full sm:h-3/8 rounded flex items-center justify-center py-4 sm:py-0">
            <Image src="/assets/png/dreampal.png" alt="dreampal" width={180} height={90} className="object-contain max-h-full" />
          </div>

          {/* 容器B 放置day/night.png - Image size adjusted for mobile */}
          <div className="w-full sm:h-3/8 rounded flex items-center justify-center py-4 sm:py-0">
            {theme === 'light' ? (
              <Image src="/assets/png/day.png" alt="day" width={300} height={300} className="object-contain max-h-full transition-all duration-500 breath-animation sm:w-auto sm:h-auto" />
            ) : (
              <Image src="/assets/png/night.png" alt="night" width={300} height={300} className="object-contain max-h-full transition-all duration-500 breath-animation sm:w-auto sm:h-auto" />
            )}
          </div>

          {/* 容器C 放置对应button - ButtonIcon size adjusted for mobile */}
          <div className="w-full mt-0 sm:h-1/4 rounded flex items-center justify-center py-4 sm:py-0 sm:mt-10">
            {theme === 'light' ? (
              <a
                href="/assets/download/dreampal.apk"
                download
                className="transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none inline-block cursor-pointer"
              >
                <DayButtonIcon className="w-[200px] h-auto sm:w-[240px] sm:h-[80px]" />
              </a>
            ) : (
              <a
                href="/assets/download/dreampal.apk"
                download
                className="transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none inline-block cursor-pointer"
              >
                <NightButtonIcon className="w-[200px] h-auto sm:w-[240px] sm:h-[80px]" />
              </a>
            )}
          </div>
        </div>

        {/* 容器D 放置视频 - Conditional rendering for mobile, ensure it takes space */}
        <div
          className={`w-full sm:w-224 min-h-[300px] sm:min-h-0 sm:h-126 ${activeMobileTab === 'blockABC' ? 'hidden sm:flex' : 'flex'} items-center justify-center overflow-hidden`}
        >
          <video
            key={theme + activeMobileTab} // Add key to re-render video on tab/theme change if needed
            className="w-full h-full object-cover"
            src="/ASSETS/video.mp4"
            poster="/ASSETS/png/cover.png"
            controls
            preload="metadata" // Recommended for faster loading of video metadata
          >
            您的浏览器不支持 HTML5 video 标签。
          </video>
        </div>
      </div>

      {/* Mobile Navigation Buttons - Added at the bottom for mobile view */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-5 sm:hidden z-20 p-2 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-sm shadow-lg">
        <button
          onClick={() => setActiveMobileTab('blockABC')}
          aria-label="常规视图"
          className={`p-2.5 w-20 h-10 rounded-full text-sm font-medium flex items-center justify-center transition-colors duration-200 ${
            activeMobileTab === 'blockABC'
              ? theme === 'light' ? 'bg-[#FFBDDA] text-gray-800' : 'bg-[#C0DBF9] text-gray-800'
              : 'bg-transparent text-gray-500 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-700/70'
          }`}
        >
          下载
        </button>
        <button
          onClick={() => setActiveMobileTab('blockD')}
          aria-label="视频视图"
          className={`p-2.5 w-20 h-10 rounded-full text-sm font-medium flex items-center justify-center transition-colors duration-200 ${
            activeMobileTab === 'blockD'
              ? theme === 'light' ? 'bg-[#FFBDDA] text-gray-800' : 'bg-[#C0DBF9] text-gray-800'
              : 'bg-transparent text-gray-500 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-700/70'
          }`}
        >
          视频
        </button>
      </div>
    </main>
  );
}
