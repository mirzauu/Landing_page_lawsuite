"use client"
import { useState, useRef, useEffect } from "react"
import matchedData from "../../../matched_output.json"
import {
  RiFullscreenFill,
  RiFilePdfFill,
  RiMicFill,
  RiCloseLine,
} from "@remixicon/react"
import { SolarMark } from "../../../public/SolarMark"
import { Orbit } from "../Orbit"

interface Match {
  raw_chunk_id: string | number;
  raw_chunk_text: string;
  matched_audio_text?: string;
  audio_start_time_sec: number;
  audio_end_time_sec: number;
}

const demoChunks = (matchedData.matches as Match[]).map((m) => ({
  id: m.raw_chunk_id,
  raw: m.raw_chunk_text,
  matched: m.matched_audio_text || "(No audio match found)",
  start: m.audio_start_time_sec,
  end: m.audio_end_time_sec
}));

const firstChunkStart = demoChunks.length > 0 ? demoChunks[0].start : 1347.09;

export default function Features() {
  const [expandedPdf, setExpandedPdf] = useState<{ url: string; title: string } | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const agentAudioRef = useRef<HTMLAudioElement>(null)
  const alignmentSectionRef = useRef<HTMLDivElement>(null)

  const hasUserInteracted = useRef(false);
  const hasAutoPlayed = useRef(false);

  // Phase 1: Unlock audio on first user interaction (click, touch, keydown, scroll)
  useEffect(() => {
    const unlockAudio = () => {
      hasUserInteracted.current = true;
      // Try to trigger play on the Data Alignment section if it's already visible
      if (!hasAutoPlayed.current && audioRef.current && alignmentSectionRef.current) {
        const rect = alignmentSectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          // 33 minutes = 1980 seconds
          audioRef.current.currentTime = 1980;
          audioRef.current.play().catch(() => {});
          hasAutoPlayed.current = true;
        }
      }
    };

    window.addEventListener("click", unlockAudio, { once: false });
    window.addEventListener("touchstart", unlockAudio, { once: false });
    window.addEventListener("keydown", unlockAudio, { once: false });
    window.addEventListener("scroll", unlockAudio, { once: false, passive: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
    };
  }, []);

  // Phase 2: IntersectionObserver to auto-play Data Alignment audio when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && audioRef.current && !hasAutoPlayed.current) {
          if (hasUserInteracted.current) {
            // 33 minutes = 1980 seconds
            audioRef.current.currentTime = 1980;
            audioRef.current.play().catch(() => {});
            hasAutoPlayed.current = true;
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (alignmentSectionRef.current) {
      observer.observe(alignmentSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeChunk = demoChunks.find(chunk => {
      const activeTime = (audioDuration > 0 && audioDuration < 1000) ? currentTime + firstChunkStart : currentTime;
      return activeTime >= chunk.start && activeTime <= chunk.end;
    });
    
    if (activeChunk) {
      const rawElement = document.getElementById(`raw-${activeChunk.id}`);
      const matchedElement = document.getElementById(`matched-${activeChunk.id}`);

      if (rawElement) {
        rawElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      if (matchedElement) {
        matchedElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentTime, audioDuration]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      if (audioRef.current.duration) {
        setAudioDuration(audioRef.current.duration)
      }
    }
  }

  const handleChunkClick = (start: number) => {
    if (audioRef.current) {
      let seekTime = start;
      // Adjust seek time if audio is a short cropped snippet
      if (audioRef.current.duration > 0 && audioRef.current.duration < 1000 && start >= firstChunkStart) {
         seekTime = Math.max(0, start - firstChunkStart);
      }
      audioRef.current.currentTime = seekTime;
      audioRef.current.play().catch(() => {})
    }
  }

  const activeTime = (audioDuration > 0 && audioDuration < 1000) ? currentTime + firstChunkStart : currentTime;

  return (
    <section
      aria-label="VerbaLex AI Features"
      id="features"
      className="relative mx-auto max-w-6xl scroll-my-24"
    >
      {/* Vertical Lines */}
      <div className="pointer-events-none inset-0 select-none">
        {/* Left */}
        <div
          className="absolute inset-y-0 -my-20 w-px"
          style={{
            maskImage:
              "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>

        {/* Right */}
        <div
          className="absolute inset-y-0 right-0 -my-20 w-px"
          style={{
            maskImage:
              "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
        {/* Middle */}
        <div
          className="absolute inset-y-0 left-1/2 -z-10 -my-20 w-px"
          style={{
            maskImage:
              "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
        {/* 25% */}
        <div
          className="absolute inset-y-0 left-1/4 -z-10 -my-20 hidden w-px sm:block"
          style={{
            maskImage:
              "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
        {/* 75% */}
        <div
          className="absolute inset-y-0 left-3/4 -z-10 -my-20 hidden w-px sm:block"
          style={{
            maskImage:
              "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-0">
        {/* Content */}
        <div className="col-span-2 my-auto px-2 order-1">
          <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
            AI-Powered Agents
            <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
          </h2>
          <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
            A network of specialized AI agents for complete transcript processing
          </p>
          <p className="mt-4 text-balance text-gray-700">
            Deploy context-aware agents to clean, align, and apply complex legal terminology to your Stenographic reports with our integrated platform.
          </p>
        </div>
        <div className="relative col-span-2 flex items-center justify-center overflow-hidden order-2">
          <svg
            className="absolute size-full mask-[linear-gradient(transparent,white_10rem)]"
          >
            <defs>
              <pattern
                id="diagonal-feature-pattern"
                patternUnits="userSpaceOnUse"
                width="64"
                height="64"
              >
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      className="stroke-gray-200/70"
                      strokeWidth="1"
                    />
                  )
                })}
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#diagonal-feature-pattern)"
            />
          </svg>

          {/* Floating Audio Card */}
          <div className="absolute top-4 left-4 z-50 w-56 rounded-xl border border-white/60 bg-white/70 p-3 shadow-xl backdrop-blur-md transition-transform hover:scale-105 pointer-events-auto">
            <h4 className="mb-2 text-xs font-bold text-gray-800">Raw Audio Source</h4>
            <audio 
              ref={agentAudioRef}
              controls 
              className="h-8 w-full" 
              src="https://res.cloudinary.com/dbx01oh15/video/upload/v1777904239/SAKHAI_-v-_DELKAP.rawfile.POCgarryAI_mo7p6h.mp3" 
              preload="metadata" 
            />
          </div>



          <div className="pointer-events-none h-104 p-10 select-none">
            <div className="relative flex flex-col items-center justify-center">
              <Orbit
                durationSeconds={40}
                radiusPx={110}
                keepUpright
                orbitingObjects={[
                  <div
                    key="obj1"
                    className="relative flex items-center justify-center"
                  >
                    <RiFilePdfFill className="z-10 size-6 text-red-500" />
                    <div className="absolute size-10 rounded-full bg-white/80 ring-1 shadow-lg ring-black/10 backdrop-blur-sm"></div>
                    <div
                      style={{
                        animationDelay: "2s",
                      }}
                      className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1 ring-red-500/50"
                    ></div>
                  </div>,
                  <div
                    key="obj2"
                    className="relative flex items-center justify-center"
                  >
                    <RiMicFill className="z-10 size-6 text-blue-500" />
                    <div className="absolute size-10 rounded-full bg-white/80 ring-1 shadow-lg ring-black/10 backdrop-blur-sm"></div>
                    <div
                      style={{
                        animationDelay: "3s",
                      }}
                      className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1 ring-blue-500/50"
                    ></div>
                  </div>,
                ]}
              >
                <div className="relative flex h-48 w-48 items-center justify-center">
                  <div className="rounded-full p-1 ring-1 ring-black/10">
                    <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-white ring-1 shadow-[inset_0px_-15px_20px_rgba(0,0,0,0.1),0_7px_10px_0_rgba(0,0,0,0.15)] ring-black/20">
                      <SolarMark className="size-10" />
                    </div>
                    <div className="absolute inset-12 animate-[spin_8s_linear_infinite] rounded-full bg-linear-to-t from-transparent via-orange-400 to-transparent blur-lg" />
                  </div>
                </div>
              </Orbit>
            </div>
          </div>
        </div>

        <div className="col-span-2 my-auto px-2 order-3 md:order-4">
          <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
            Data Alignment
            <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
          </h2>
          <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
            Turn every audio millisecond into a precise text reference
          </p>
          <p className="mt-4 text-balance text-gray-700">
            Revolutionize your transcription workflow with semantic alignment that perfectly syncs raw audio with transcribed text in real-time. Make human review faster, reduce formatting waste, and maximize accuracy.
          </p>
        </div>
        <div ref={alignmentSectionRef} className="relative col-span-2 flex items-center justify-center overflow-hidden order-4 md:order-3 py-10">
          <svg className="absolute size-full">
            <defs>
              <pattern
                id="diagonal-feature-pattern-2"
                patternUnits="userSpaceOnUse"
                width="64"
                height="64"
              >
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      className="stroke-gray-200/70"
                      strokeWidth="1"
                    />
                  )
                })}
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#diagonal-feature-pattern-2)"
            />
          </svg>

          <div className="relative flex w-full max-w-lg flex-col gap-6 p-4 z-10 pointer-events-auto">
            {/* Audio file */}
            <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur-md transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                     <RiMicFill className="size-4 text-blue-600" />
                   </div>
                   <span className="text-sm font-bold text-gray-800">Source Audio</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Live Sync</span>
                 </div>
              </div>
              <audio 
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                controls 
                className="h-10 w-full rounded-lg bg-gray-50" 
                src="https://res.cloudinary.com/dbx01oh15/video/upload/v1777904239/SAKHAI_-v-_DELKAP.rawfile.POCgarryAI_mo7p6h.mp3" 
                preload="metadata" 
              />
            </div>

            {/* Split View for Raw and Matched */}
            <div className="flex flex-col gap-4">
              {/* Raw Text Data */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg relative h-64 flex flex-col">
                 <span className="absolute -top-3 left-6 bg-white px-3 py-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase rounded-full border border-gray-200 shadow-sm z-10">Stenographic report</span>
                 <div className="overflow-y-auto flex-1 mt-2 space-y-3 pr-2">
                    {demoChunks.map(chunk => {
                       const isActive = activeTime >= chunk.start && activeTime <= chunk.end;
                       return (
                         <div 
                           id={`raw-${chunk.id}`}
                           key={`raw-${chunk.id}`}
                           onClick={() => handleChunkClick(chunk.start)}
                           className={`cursor-pointer text-xs leading-relaxed font-mono p-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-50 border border-red-100 text-red-900 shadow-sm scale-[1.02]' : 'text-gray-400 hover:bg-gray-50 border border-transparent hover:text-gray-600'}`}
                         >
                            {chunk.raw}
                         </div>
                       )
                    })}
                 </div>
              </div>



              {/* Matched Transcribe */}
              <div className="rounded-2xl border border-orange-200 bg-linear-to-b from-orange-50 to-white p-5 shadow-lg relative h-64 flex flex-col">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500 z-0 rounded-l-2xl" />
                 <span className="absolute -top-3 left-6 bg-orange-500 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-full shadow-sm z-10">Aligned Transcript</span>
                 
                 <div className="overflow-y-auto flex-1 mt-2 space-y-3 pr-2 z-10 relative">
                    {demoChunks.map(chunk => {
                       const isActive = activeTime >= chunk.start && activeTime <= chunk.end;
                       return (
                         <div 
                           id={`matched-${chunk.id}`}
                           key={`matched-${chunk.id}`}
                           onClick={() => handleChunkClick(chunk.start)}
                           className={`cursor-pointer text-sm leading-relaxed p-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-white border border-orange-200 text-gray-900 shadow-md font-medium ring-1 ring-orange-500/20 scale-[1.02]' : 'text-gray-500 hover:bg-white/50 border border-transparent hover:text-gray-700'}`}
                         >
                            {chunk.matched}
                         </div>
                       )
                    })}
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 my-auto px-2 order-5">
          <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
            Seamless Export
            <div className="absolute top-1 -left-[7px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
          </h2>
          <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
            Generate court-ready documents with single-click simplicity
          </p>
          <p className="mt-4 text-balance text-gray-700">
            Export your finalized, perfectly formatted transcripts into Word or PDF formats instantly. Our system automatically structures the output ready for the courtroom.
          </p>
        </div>
        <div className="relative col-span-2 flex items-center justify-center overflow-hidden order-6 py-10">
          <svg className="absolute size-full mask-[linear-gradient(white_10rem,transparent)]">
            <defs>
              <pattern
                id="diagonal-feature-pattern-3"
                patternUnits="userSpaceOnUse"
                width="64"
                height="64"
              >
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      className="stroke-gray-200/70"
                      strokeWidth="1"
                    />
                  )
                })}
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#diagonal-feature-pattern-3)"
            />
          </svg>


        </div>
      </div>

      {/* PDF Fullscreen Modal */}
      {expandedPdf && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <RiFilePdfFill className="size-5 text-red-500" />
                {expandedPdf.title}
              </h3>
              <button 
                onClick={() => setExpandedPdf(null)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <RiCloseLine className="size-6" />
              </button>
            </div>
            <div className="flex-1 p-2 bg-gray-100 rounded-b-2xl overflow-hidden">
              <iframe 
                src={`${expandedPdf.url}#toolbar=0`}
                className="h-full w-full rounded-xl bg-white shadow-inner" 
                title="Fullscreen PDF" 
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
