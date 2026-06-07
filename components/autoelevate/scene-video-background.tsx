"use client";

import { useEffect, useRef } from "react";

type SceneVideoBackgroundProps = {
  src: string;
  poster: string;
  isActive: boolean;
};

export const SceneVideoBackground = ({
  src,
  poster,
  isActive,
}: SceneVideoBackgroundProps): React.ReactElement => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isActive]);

  return (
    <>
      <div className="scene-bg-video">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
      <div className="scene-bg-overlay" aria-hidden="true" />
    </>
  );
};
