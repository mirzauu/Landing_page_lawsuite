import {
  RiUploadCloud2Line,
  RiGitMergeLine,
  RiCpuLine,
  RiUserStarLine,
} from "@remixicon/react"
import { FadeContainer, FadeDiv } from "../Fade"

const steps = [
  {
    title: "Upload",
    description: "Upload audio + Stenographic report to our secure platform.",
    icon: RiUploadCloud2Line,
    details: ["Accepts multiple audio formats", "Secure, encrypted upload", "Instant availability"],
  },
  {
    title: "Sync & Align",
    description: "AI perfectly syncs audio and text semantically.",
    icon: RiGitMergeLine,
    details: ["Millisecond precision", "Speaker diarization", "Noise reduction alignment"],
  },
  {
    title: "AI Processing",
    description: "Specialized agents process the Stenographic report.",
    icon: RiCpuLine,
    details: [
      "Clean Agent: Cleans and structures data",
      "Research Agent: Applies contextual understanding",
      "Terminology Agent: Ensures correct legal language",
    ],
  },
  {
    title: "Human Review & Output",
    description: "Human experts verify and generate court-ready files.",
    icon: RiUserStarLine,
    details: ["Human edits and verifies", "Accuracy up to ~99%", "Export final document (Word/PDF)"],
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto w-full max-w-6xl scroll-my-24 overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-lg font-semibold tracking-tight text-orange-500">
          How It Works
        </h2>
        <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-5xl">
          From Stenographic Report to Court-Ready in 4 Steps
        </p>
      </div>

      <FadeContainer className="grid grid-cols-1 gap-8 md:grid-cols-4 relative z-10">
        <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-gray-200 md:block" aria-hidden="true" />
        
        {steps.map((step, index) => (
          <FadeDiv
            key={index}
            className="relative flex flex-col items-center rounded-2xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-gray-200 text-center"
          >
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 ring-4 ring-white relative z-10">
              <step.icon className="size-8" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Step {index + 1}: {step.title}
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              {step.description}
            </p>
            <ul className="flex flex-col items-start gap-2 text-left w-full text-xs text-gray-500">
              {step.details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </FadeDiv>
        ))}
      </FadeContainer>
    </section>
  )
}
