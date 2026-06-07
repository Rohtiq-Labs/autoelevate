"use client";

import { useEffect, useRef, useState } from "react";

import { videoPlaybackManager } from "@/lib/video-playback-manager";

type UseManagedVideoOptions = {
  src: string;
  lazy?: boolean;
  priority?: number;
  isActive?: boolean;
};

type UseManagedVideoResult = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  setVideoRef: (element: HTMLVideoElement | null) => void;
  videoSrc: string | undefined;
  preload: "none" | "auto";
};

export const useManagedVideo = ({
  src,
  lazy = true,
  priority = 0,
  isActive = true,
}: UseManagedVideoOptions): UseManagedVideoResult => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [isVisible, setIsVisible] = useState(false);

  const videoSrc = !lazy || isLoaded ? src : undefined;
  const preload = lazy ? "none" : "auto";
  const wantsPlay = isVisible && isActive && Boolean(videoSrc);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (lazy && entry.isIntersecting) {
            setIsLoaded(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!videoElement) return;
    return videoPlaybackManager.register(videoElement, priority);
  }, [videoElement, priority]);

  useEffect(() => {
    if (!videoElement) return;
    videoPlaybackManager.setWantsPlay(videoElement, wantsPlay);
  }, [videoElement, wantsPlay]);

  useEffect(() => {
    if (!videoElement || !videoSrc) return;

    const onCanPlay = (): void => {
      videoPlaybackManager.notifyReady(videoElement);
    };

    videoElement.addEventListener("canplay", onCanPlay);

    return () => videoElement.removeEventListener("canplay", onCanPlay);
  }, [videoElement, videoSrc]);

  return {
    containerRef,
    setVideoRef: setVideoElement,
    videoSrc,
    preload,
  };
};
