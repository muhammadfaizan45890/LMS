import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

const Video = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const youtubeUrl = location.state?.youtubeUrl;
  const playerRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(true);

  // extract video id
  const getVideoId = (url) => {
    if (!url) return null;

    const regex =
      /(?:youtube\.com.*(?:v=|\/embed\/|\/shorts\/)|youtu\.be\/)([^&?/\s]+)/;

    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(youtubeUrl);

  // player ready
  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());

    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  // controls
  const handlePlayPause = () => {
    if (!playerRef.current) return;

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setPlaying(!playing);
  };

  const forward10 = () => {
    playerRef.current?.seekTo(currentTime + 10, true);
  };

  const backward10 = () => {
    playerRef.current?.seekTo(currentTime - 10, true);
  };

  const formatTime = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-6">

      {/* STOP BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        ⬅ Stop Video
      </button>

      {/* VIDEO WRAPPER */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700">

          {videoId ? (
            <div className="w-full h-full pointer-events-none">
              <YouTube
                videoId={videoId}
                className="w-full h-full"
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 0,      // ❌ no YouTube controls
                    rel: 0,           // ❌ no related videos
                    modestbranding: 1,
                    fs: 0,
                    disablekb: 1,
                    iv_load_policy: 3,
                  },
                }}
                onReady={onReady}
              />
            </div>
          ) : (
            <div className="text-white flex items-center justify-center h-full">
              No video found
            </div>
          )}
        </div>
      </div>

      {/* CUSTOM CONTROLS */}
      <div className="mt-8 flex flex-col items-center gap-3 text-white">

        <div className="flex gap-4">
          <button onClick={backward10} className="px-5 py-2 bg-gray-700 rounded-lg">
            ⏪ 10s
          </button>

          <button onClick={handlePlayPause} className="px-6 py-2 bg-white text-black rounded-lg font-semibold">
            {playing ? "Pause" : "Play"}
          </button>

          <button onClick={forward10} className="px-5 py-2 bg-gray-700 rounded-lg">
            10s ⏩
          </button>
        </div>

        <div className="text-sm text-gray-300">
          ⏱ {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <div className="text-sm text-gray-400">
          Remaining: {formatTime(duration - currentTime)}
        </div>

      </div>
    </div>
  );
};

export default Video;