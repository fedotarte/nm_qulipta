"use client";

import { useEffect, useState, useRef } from "react";

interface BackgroundVideoProps {
  className?: string;
  poster?: string;
}

export const BackgroundVideo = ({ className, poster }: BackgroundVideoProps) => {
  const [videoSrc, setVideoSrc] = useState("/video/bg_video_mob.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateVideoSrc = () => {
      const newSrc =
        window.innerWidth >= 1280
          ? "/video/bg_video_desk.mp4"
          : "/video/bg_video_mob.mp4";

      if (newSrc !== videoSrc) {
        setVideoSrc(newSrc);
      }
    };

    updateVideoSrc();

    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, [videoSrc]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [videoSrc]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};
