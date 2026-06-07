const MAX_CONCURRENT_VIDEOS = 2;

type VideoRegistration = {
  priority: number;
  wantsPlay: boolean;
};

class VideoPlaybackManager {
  private registrations = new Map<HTMLVideoElement, VideoRegistration>();

  register(video: HTMLVideoElement, priority = 0): () => void {
    this.registrations.set(video, { priority, wantsPlay: false });
    return () => {
      video.pause();
      this.registrations.delete(video);
    };
  }

  setWantsPlay(video: HTMLVideoElement, wantsPlay: boolean): void {
    const entry = this.registrations.get(video);
    if (!entry) return;
    entry.wantsPlay = wantsPlay;
    this.sync();
  }

  notifyReady(video: HTMLVideoElement): void {
    if (!this.registrations.has(video)) return;
    this.sync();
  }

  private sync(): void {
    const candidates = [...this.registrations.entries()]
      .filter(([, registration]) => registration.wantsPlay)
      .sort((a, b) => b[1].priority - a[1].priority);

    const allowed = new Set(
      candidates.slice(0, MAX_CONCURRENT_VIDEOS).map(([video]) => video),
    );

    for (const [video, registration] of this.registrations) {
      if (allowed.has(video) && registration.wantsPlay && video.src) {
        void video.play().catch(() => undefined);
        continue;
      }
      video.pause();
    }
  }
}

export const videoPlaybackManager = new VideoPlaybackManager();
