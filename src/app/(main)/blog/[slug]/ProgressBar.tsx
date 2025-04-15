"use client";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      // Berechne den Scroll-Fortschritt
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(scrollPercent * 100);
    };

    // Event-Listener für das Scroll-Event hinzufügen
    window.addEventListener("scroll", updateScrollProgress);

    // Initial aufrufen
    updateScrollProgress();

    // Cleanup beim Unmount
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-black">
      <div
        style={{
          width: `${scrollProgress}%`,
          animationDuration: "400ms",
        }}
        className="h-full rounded-r-full bg-cyberblue/75 transition-all duration-1000 ease-out"
      />
    </div>
  );
};

export default ProgressBar;
