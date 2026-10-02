import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { SparkleStar } from './decorations/HandDrawnMarks.jsx';
import WatercolorFlower from './decorations/WatercolorFlower.jsx';

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
};

const VideoPage = ({ config, onBack }) => {
  const { video } = config;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayback = async () => {
    if (!audioRef.current || !isAudioReady) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audioRef.current.pause();
    }
  };

  const skip = (seconds) => {
    if (!audioRef.current || !isAudioReady) return;
    const nextTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value);
    if (!audioRef.current || !isAudioReady) return;
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <motion.section
      key="audio"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5 }}
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center bg-[#fbfaf7] overflow-hidden"
    >
      <WatercolorFlower className="hidden sm:block absolute top-8 right-6 w-44 opacity-70" />
      <WatercolorFlower className="hidden sm:block absolute bottom-8 left-6 w-40 opacity-60" flip />
      <SparkleStar className="absolute top-16 left-10 w-10 h-10 text-[#a9bcd8]" color="#a9bcd8" />
      <SparkleStar className="absolute top-32 right-12 w-6 h-6 text-[#cf9f53] opacity-60" color="#cf9f53" />

      <h2 className="font-arabic text-4xl sm:text-5xl text-[#0d162a] mb-6 z-10">
        {video.heading}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="relative z-10 flex w-full max-w-lg flex-col items-center"
      >
        <div className="w-[min(72vw,320px)] aspect-square overflow-hidden rounded-sm shadow-[0_14px_30px_rgba(27,42,74,0.18)] rotate-2">
          <img
            src={video.artwork}
            alt={video.artworkAlt}
            className="block h-full w-full object-cover"
          />
        </div>

        <div className="mt-3 w-full text-right">
          <div className="flex items-center gap-3" dir="ltr">
            <span className="w-10 text-left text-xs tabular-nums text-[#1b2a4a]/65">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={handleSeek}
              disabled={!isAudioReady}
              aria-label="تقديم أو إرجاع الأغنية"
              className="h-1 w-full cursor-pointer accent-[#c98a4b] disabled:cursor-not-allowed disabled:opacity-40"
            />
            <span className="w-10 text-right text-xs tabular-nums text-[#1b2a4a]/65">{formatTime(duration)}</span>
          </div>

          <div className="mt-4 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-12" dir="ltr">
            <button type="button" onClick={() => skip(-10)} disabled={!isAudioReady} aria-label="ارجعي 10 ثوانٍ" className="justify-self-end text-[#1b2a4a] transition-colors hover:text-[#c98a4b] disabled:opacity-35">
              <FaBackward aria-hidden="true" />
            </button>
            <button type="button" onClick={togglePlayback} disabled={!isAudioReady} aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'} className="grid h-12 w-12 place-items-center rounded-full bg-[#1b2a4a] text-white shadow-md transition-transform hover:scale-105 disabled:opacity-45">
              {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" className="ml-0.5" />}
            </button>
            <button type="button" onClick={() => skip(10)} disabled={!isAudioReady} aria-label="تقدمي 10 ثوانٍ" className="justify-self-start text-[#1b2a4a] transition-colors hover:text-[#c98a4b] disabled:opacity-35">
              <FaForward aria-hidden="true" />
            </button>
          </div>

          <audio
            ref={audioRef}
            src={video.audioSrc || undefined}
            preload="metadata"
            onLoadedMetadata={(event) => {
              setDuration(event.currentTarget.duration);
              setIsAudioReady(true);
            }}
            onError={() => setIsAudioReady(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-8 z-10">
        {onBack && (
          <button type="button" onClick={onBack} className="underline underline-offset-4 font-serif text-[#0d162a] hover:text-[#cf9f53] transition-colors focus-visible:outline-none text-lg">
            {video.backLabel || 'Back'}
          </button>
        )}
      </div>
    </motion.section>
  );
};

export default VideoPage;