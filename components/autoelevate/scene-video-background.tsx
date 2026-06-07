"use client";

import { useManagedVideo } from "@/lib/use-managed-video";

type SceneVideoBackgroundProps = {
  src: string;
  poster: string;
  isActive: boolean;
  priority?: number;
};

export const SceneVideoBackground = ({
  src,
  poster,
  isActive,
  priority = 10,
}: SceneVideoBackgroundProps): React.ReactElement => {
  const { containerRef, setVideoRef, videoSrc, preload } = useManagedVideo({
    src,
    lazy: false,
    priority,
    isActive,
  });

  return (
    <>
      <div className="scene-bg-video" ref={containerRef}>
        <video
          ref={setVideoRef}
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={preload}
          aria-hidden="true"
        />
      </div>
      <div className="scene-bg-overlay" aria-hidden="true" />
    </>
  );
};
