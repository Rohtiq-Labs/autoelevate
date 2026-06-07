"use client";

import { useEffect, useRef } from "react";

type SectionVideoBackgroundProps = {
  src: string;
  poster?: string;
};

export const SectionVideoBackground = ({
  src,
  poster,
}: SectionVideoBackgroundProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined);
            return;
          }
          video.pause();
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-video-bg" ref={containerRef} aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="section-video-overlay" />
    </div>
  );
};
