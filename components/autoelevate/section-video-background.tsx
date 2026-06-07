"use client";

import { useManagedVideo } from "@/lib/use-managed-video";

type SectionVideoBackgroundProps = {
  src: string;
  poster?: string;
  priority?: number;
};

export const SectionVideoBackground = ({
  src,
  poster,
  priority = 0,
}: SectionVideoBackgroundProps): React.ReactElement => {
  const { containerRef, setVideoRef, videoSrc, preload } = useManagedVideo({
    src,
    lazy: true,
    priority,
  });

  return (
    <div className="section-video-bg" ref={containerRef} aria-hidden="true">
      <video
        ref={setVideoRef}
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
      />
      <div className="section-video-overlay" />
    </div>
  );
};
