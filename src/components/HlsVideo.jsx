import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   SHARED HLS VIDEO COMPONENT
   Used by Home, Footer and Projects page
───────────────────────────────────────── */
export function HlsVideo({ src, className, style, flipY }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryInit = () => {
      const Hls = window.Hls;
      if (!Hls) { setTimeout(tryInit, 200); return; }
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: false });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.play().catch(() => {});
      }
    };
    tryInit();
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={className}
      style={{ ...(flipY ? { transform: "scaleY(-1)" } : {}), ...style }}
    />
  );
}

export const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default HlsVideo;
