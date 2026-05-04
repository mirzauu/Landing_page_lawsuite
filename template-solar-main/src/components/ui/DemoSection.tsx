"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  RiUploadCloud2Line,
  RiFileWord2Fill,
  RiFilePdfFill,
  RiCheckLine,
  RiLoader4Line,
  RiPlayFill,
  RiRefreshLine,
  RiMicFill,
} from "@remixicon/react"
import { Button } from "../Button"
import { cx } from "@/lib/utils"
import matchedData from "../../../matched_output.json"

const steps = [
  "Uploading",
  "Processing",
  "AI Agents",
  "Human Review",
  "Completed",
]

const demoChunks = matchedData?.matches ? matchedData.matches.map((m: any) => ({
  id: m.raw_chunk_id,
  raw: m.raw_chunk_text,
  matched: m.matched_audio_text || "(No audio match found)",
  start: m.audio_start_time_sec,
  end: m.audio_end_time_sec
})) : [];

const firstChunkStart = demoChunks.length > 0 ? demoChunks[0].start : 1347.09;

const statusMessages = [
  "Waiting to start...",
  "Uploading audio and transcript files...",
  "Syncing audio with transcript semantically...",
  "Applying legal terminology and structuring...",
  "Awaiting final human verification...",
  "Document is ready for download.",
]

const TerminologyAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-xl animate-in fade-in zoom-in duration-300">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-sm" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-sm" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-sm" />
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-orange-50 px-2 py-0.5 border border-orange-100">
          <RiCheckLine className="size-3 text-orange-500" />
          <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">Terminology Agent</span>
        </div>
      </div>

      {/* Content */}
      <div className="font-mono text-xs leading-relaxed text-gray-500 text-left">
        <p className="mb-2 text-gray-400">I represent Island Snow Services with respect to an accident back on</p>
        
        <div className="relative flex h-10 w-full items-center overflow-hidden rounded-lg bg-gray-50 px-2 border border-gray-100">
          
          {/* Base state */}
          {step === 0 && <span className="text-gray-400 transition-opacity">02/04/2021...</span>}
          
          {/* Highlight state */}
          {step === 1 && (
            <span className="text-red-500 bg-red-100/50 px-1 rounded transition-all font-semibold shadow-sm ring-1 ring-red-200">
              02/04/2021
            </span>
          )}
          
          {/* Processing state */}
          {step === 2 && (
            <div className="flex items-center gap-2 w-full">
              <span className="text-gray-300 line-through decoration-red-400">02/04/2021</span>
              <div className="flex items-center text-orange-500">
                <span className="text-[10px] font-bold animate-pulse">FIXING</span>
              </div>
            </div>
          )}
          
          {/* Replaced state */}
          {step === 3 && (
            <span className="text-green-700 bg-green-50 px-1.5 py-0.5 rounded font-bold transition-all shadow-sm ring-1 ring-green-200 animate-in zoom-in duration-300">
              February 4th, 2021
            </span>
          )}

          {/* Scanner Line */}
          {(step === 0 || step === 1) && (
            <div 
              className="absolute top-0 bottom-0 w-1 bg-orange-400 shadow-[0_0_10px_2px_rgba(249,115,22,0.4)] z-20"
              style={{
                animation: 'scan-x 2s ease-in-out infinite alternate'
              }}
            />
          )}
        </div>
        
        <p className="mt-2 text-gray-400">And we&apos;re here to take your deposition today...</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scan-x {
            0% { transform: translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(330px); opacity: 0; }
          }
        `}} />
      </div>
    </div>
  );
}

export function DemoSection() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = not started, 1..5 = steps
  const [progress, setProgress] = useState(0)
  
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [chunks, setChunks] = useState(demoChunks)
  const [editingChunkId, setEditingChunkId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

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
      if (audioRef.current.duration > 0 && audioRef.current.duration < 1000 && start >= firstChunkStart) {
         seekTime = Math.max(0, start - firstChunkStart);
      }
      audioRef.current.currentTime = seekTime;
      audioRef.current.play().catch(() => {})
    }
  }

  const activeTime = (audioDuration > 0 && audioDuration < 1000) ? currentTime + firstChunkStart : currentTime;

  useEffect(() => {
    if (currentStep !== 4) return;
    const activeChunk = demoChunks.find(chunk => {
      const t = activeTime;
      return t >= chunk.start && t <= chunk.end;
    });
    
    if (activeChunk) {
      const rawElement = document.getElementById(`demo-raw-${activeChunk.id}`);
      const matchedElement = document.getElementById(`demo-matched-${activeChunk.id}`);

      if (rawElement) {
        rawElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (matchedElement) {
        matchedElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentTime, audioDuration, currentStep, activeTime]);

  useEffect(() => {
    if (progress >= 100) {
      setCurrentStep((prev) => prev + 1)
      setProgress(0)
    }
  }, [progress])

  useEffect(() => {
    // Pause interval if not started, if at Human Review (step 4), or if done.
    if (currentStep === 0 || currentStep === 4 || currentStep > 5) return

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2))
    }, 50) // 50ms * 50 = 2.5s per step

    return () => clearInterval(interval)
  }, [currentStep])

  const startDemo = () => {
    setCurrentStep(1)
    setProgress(0)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setProgress(0)
  }

  return (
    <section id="demo" className="relative mx-auto w-full max-w-6xl scroll-my-24 py-10">
      <div className="mb-12 text-center">
        <h2 className="text-lg font-semibold tracking-tight text-orange-500">
          Interactive Demo
        </h2>
        <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-5xl">
          Experience the VeriScript AI Workflow
        </p>
      </div>

      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10 overflow-hidden">
        {/* Mock Window Header */}
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="mx-auto text-xs font-medium text-gray-400">VeriScript Workspace</div>
        </div>

        {/* Demo Content */}
        <div className="p-6 md:p-10 min-h-[400px] flex flex-col">
          
          {/* Stepper */}
          <div className="mb-8 flex justify-between relative">
            <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-gray-100 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, ((currentStep - 1) / 4) * 100))}%` }}
            />
            
            {steps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isPast = currentStep > stepNumber;
              const isCurrent = currentStep === stepNumber;
              
              return (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className={cx(
                    "flex size-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300",
                    isPast ? "border-orange-500 bg-orange-500 text-white" : 
                    isCurrent ? "border-orange-500 bg-white text-orange-500" : 
                    "border-gray-200 bg-white text-gray-400"
                  )}>
                    {isPast ? <RiCheckLine className="size-5" /> : stepNumber}
                  </div>
                  <span className={cx(
                    "mt-2 absolute top-10 text-xs font-medium whitespace-nowrap transition-colors duration-300",
                    isCurrent ? "text-orange-600" : isPast ? "text-gray-900" : "text-gray-400"
                  )}>
                    {step}
                  </span>
                </div>
              )
            })}
          </div>

          <div className={cx(
            "mt-8 flex-1 flex flex-col rounded-xl border border-gray-200 transition-all",
            currentStep === 4 ? "bg-white p-4 md:p-6" : "bg-gray-50 p-8 items-center justify-center text-center"
          )}>
            
            {currentStep === 0 && (
              <div className="flex w-full flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="mb-8 flex w-full max-w-md flex-col gap-3">
                  <div className="flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50/50 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-orange-500 text-white">
                        <RiMicFill className="size-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900">SAKHAI_-v-_DELKAP.mp3</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Source Audio • 25.4 MB</p>
                      </div>
                    </div>
                    <RiCheckLine className="size-5 text-orange-600" />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                        <RiFilePdfFill className="size-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900">document_poc.pdf</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Rough Transcript • 1.2 MB</p>
                      </div>
                    </div>
                    <RiCheckLine className="size-5 text-blue-600" />
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-gray-900 text-center">Files Uploaded & Ready</h3>
                <p className="mb-6 text-sm text-gray-500 max-w-sm text-center">Your evidence and rough transcript have been successfully analyzed. Start the AI alignment and legal verification workflow below.</p>
                <Button onClick={startDemo} className="gap-2 bg-orange-500 hover:bg-orange-600 h-12 px-8 text-base shadow-lg shadow-orange-200 transition-all hover:scale-105 active:scale-95">
                  <RiPlayFill className="size-5 fill-current" /> Start AI Alignment
                </Button>
              </div>
            )}

            {(currentStep === 1 || currentStep === 2) && (
              <div className="flex w-full max-w-md flex-col items-center animate-in slide-in-from-bottom-4 fade-in duration-300">
                <RiLoader4Line className="size-12 animate-spin text-orange-500 mb-6" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Processing...</h3>
                <p className="mb-8 text-sm text-gray-600">{statusMessages[currentStep]}</p>
                
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 text-xs font-medium text-gray-400 w-full text-right">{progress}%</div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex w-full max-w-md flex-col items-center animate-in slide-in-from-bottom-4 fade-in duration-300">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">AI Agents Active</h3>
                <p className="mb-6 text-sm text-gray-600">{statusMessages[currentStep]}</p>
                <TerminologyAnimation />
                <div className="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 text-xs font-medium text-gray-400 w-full text-right">{progress}%</div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex w-full flex-col animate-in slide-in-from-bottom-4 fade-in duration-300">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900">Human Verification Required</h3>
                    <p className="text-xs text-gray-500 mt-1">Please review the AI alignment before finalizing the document.</p>
                  </div>
                  <Button onClick={() => setCurrentStep(5)} className="bg-green-600 hover:bg-green-700 h-10 px-6 font-semibold shadow-lg shadow-green-200">
                    Finish Review <RiCheckLine className="ml-2 size-5" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {/* Left Side: Audio & Transcribe */}
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col h-[350px]">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">Source Audio Segment</span>
                      <audio 
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        controls 
                        className="h-9 w-full bg-gray-50 rounded-lg" 
                        src="https://res.cloudinary.com/dbx01oh15/video/upload/v1777904239/SAKHAI_-v-_DELKAP.rawfile.POCgarryAI_mo7p6h.mp3" 
                        preload="metadata" 
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">Aligned Transcript</span>
                    <div className="flex-1 overflow-y-auto rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700 leading-relaxed shadow-inner scroll-smooth">
                      {chunks.map((chunk) => {
                        const isActive = activeTime >= chunk.start && activeTime <= chunk.end;
                        return (
                          <div
                            key={chunk.id}
                            id={`demo-matched-${chunk.id}`}
                            onClick={() => handleChunkClick(chunk.start)}
                            className={cx(
                              "mb-3 cursor-pointer rounded-lg border border-transparent p-2 transition-all",
                              isActive
                                ? "bg-white border-blue-200 shadow-md ring-1 ring-blue-500/50"
                                : "hover:bg-gray-100"
                            )}
                          >
                            <span className="mb-1 block text-[10px] font-bold text-gray-400">
                              {new Date(chunk.start * 1000).toISOString().substr(14, 5)} - {new Date(chunk.end * 1000).toISOString().substr(14, 5)}
                            </span>
                            {chunk.matched}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Side: Stenographic report Chunk */}
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col h-[350px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block flex items-center gap-2">
                      <RiFilePdfFill className="size-3 text-red-500" /> Stenographic report Chunk
                    </span>
                    <div className="flex-1 overflow-y-auto rounded-lg border border-orange-100 bg-orange-50/30 p-3 text-sm font-mono text-gray-600 leading-loose shadow-inner relative scroll-smooth">
                      <span className="absolute top-2 right-2 text-[10px] font-bold text-orange-400 bg-orange-100 px-2 py-0.5 rounded z-10">Stenographic report</span>
                      {chunks.map((chunk) => {
                        const isActive = activeTime >= chunk.start && activeTime <= chunk.end;
                        const isEditing = editingChunkId === chunk.id;
                        return (
                          <div
                            key={chunk.id}
                            id={`demo-raw-${chunk.id}`}
                            onClick={() => {
                              if (!isEditing) handleChunkClick(chunk.start);
                            }}
                            onDoubleClick={() => {
                              setEditingChunkId(chunk.id);
                              setEditValue(chunk.raw);
                            }}
                            className={cx(
                              "mb-4 rounded border p-3 transition-all group relative",
                              isActive && !isEditing
                                ? "border-orange-400 bg-orange-100/50 shadow-md ring-1 ring-orange-500/30"
                                : "border-transparent hover:bg-orange-100/20",
                              isEditing ? "border-orange-500 bg-white shadow-lg ring-2 ring-orange-500 z-20 cursor-default" : "cursor-pointer"
                            )}
                          >
                            {isEditing ? (
                              <div className="flex flex-col gap-2">
                                <textarea
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full rounded border border-gray-300 p-2 text-sm font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                  rows={5}
                                  autoFocus
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingChunkId(null);
                                    }}
                                    className="h-7 rounded border border-gray-300 px-3 text-xs font-medium text-gray-600 hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setChunks(chunks.map(c => c.id === chunk.id ? { ...c, raw: editValue } : c));
                                      setEditingChunkId(null);
                                    }}
                                    className="h-7 rounded bg-orange-500 px-3 text-xs font-medium text-white hover:bg-orange-600 shadow-sm"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingChunkId(chunk.id);
                                      setEditValue(chunk.raw);
                                    }}
                                    className="rounded bg-white border border-gray-200 px-2 py-1 text-[10px] font-bold text-gray-600 shadow-sm hover:bg-gray-50 hover:text-orange-500"
                                  >
                                    Edit
                                  </button>
                                </div>
                                {chunk.raw}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep > 4 && (
              <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 fade-in duration-500">
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <RiCheckLine className="size-10" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Document Ready!</h3>
                <p className="mb-8 text-sm text-gray-600">Your court-ready transcript has been verified and formatting is complete.</p>
                
                <div className="flex gap-4">
                  <Button variant="secondary" className="gap-2 border border-gray-300 hover:bg-gray-100">
                    <RiFileWord2Fill className="size-5 text-blue-600" /> Download .docx
                  </Button>
                  <Button className="gap-2">
                    <RiFilePdfFill className="size-5" /> Download PDF
                  </Button>
                </div>

                <button onClick={resetDemo} className="mt-8 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                  <RiRefreshLine className="size-3" /> Restart Demo
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  )
}
