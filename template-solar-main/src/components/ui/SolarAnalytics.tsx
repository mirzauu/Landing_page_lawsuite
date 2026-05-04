import {
  RiDropFill,
  RiNavigationFill,
  RiPieChartFill,
  RiRobot3Fill,
} from "@remixicon/react"
import { Divider } from "../Divider"
import AnalyticsIllustration from "./AnalyticsIllustration"
import { StickerCard } from "./StickerCard"

export function SolarAnalytics() {
  return (
    <section
      aria-labelledby="solar-analytics"
      className="relative mx-auto w-full max-w-6xl overflow-hidden"
    >
      <div>
        <h2
          id="solar-analytics"
          className="relative scroll-my-24 text-lg font-semibold tracking-tight text-orange-500"
        >
          Processing Analytics
          <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
        </h2>
        <p className="mt-2 max-w-lg text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
          Turn audio into Stenographic reports with real-time AI processing
        </p>
      </div>
      <div className="*:pointer-events-none">
        <AnalyticsIllustration />
      </div>
      <Divider className="mt-0"></Divider>
      <div className="grid grid-cols-1 grid-rows-2 gap-6 md:grid-cols-4 md:grid-rows-1">
        <StickerCard
          Icon={RiNavigationFill}
          title="Semantic Alignment"
          description="AI models that sync audio and text with sub-second precision."
        />
        <StickerCard
          Icon={RiRobot3Fill}
          title="Terminology Extraction"
          description="Context-aware agents that identify and correct legal terminology."
        />
        <StickerCard
          Icon={RiDropFill}
          title="Format Structuring"
          description="Automated formatting engines that generate court-ready documents."
        />
        <StickerCard
          Icon={RiPieChartFill}
          title="Accuracy Analytics"
          description="Advanced metrics that measure confidence and transcription accuracy."
        />
      </div>
    </section>
  )
}
