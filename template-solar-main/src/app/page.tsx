import { CallToAction } from "@/components/ui/CallToAction"
import FeatureDivider from "@/components/ui/FeatureDivider"
import Features from "@/components/ui/Features"
import { Hero } from "@/components/ui/Hero"
import { HowItWorks } from "@/components/ui/HowItWorks"
import { DemoSection } from "@/components/ui/DemoSection"

import { SolarAnalytics } from "@/components/ui/SolarAnalytics"
import Testimonial from "@/components/ui/Testimonial"

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col">
      <div className="pt-56">
        <Hero />
      </div>
      <div className="mt-32 px-4 xl:px-0">
        <HowItWorks />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="mt-16 px-4 xl:px-0">
        <Features />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="mt-16 px-4 xl:px-0">
        <DemoSection />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="mt-16 px-4 xl:px-0">
        <Testimonial />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="mt-12 mb-20 px-4 xl:px-0">
        <SolarAnalytics />
      </div>
      <div className="mt-10 mb-40 px-4 xl:px-0">
        <CallToAction />
      </div>
    </main>
  )
}
