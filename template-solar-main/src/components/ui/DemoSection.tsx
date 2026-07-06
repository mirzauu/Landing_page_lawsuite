"use client"

import { HeroVideoDialog } from "@/registry/magicui/hero-video-dialog"

export function DemoSection() {
  return (
    <section id="demo" className="relative mx-auto w-full max-w-6xl scroll-my-24 py-10 px-4">
      <div className="mb-12 text-center">
        <h2 className="text-lg font-semibold tracking-tight text-orange-500">
          Interactive Demo
        </h2>
        <p className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-5xl">
          Experience the VerbaLex AI Workflow
        </p>
      </div>
      <div className="relative mx-auto max-w-6xl">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/Nw6_AjkmTK8?si=7qPV6tm0X6qqRgQq"
          thumbnailSrc="/images/Screenshot%202026-07-06%20210350.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/Nw6_AjkmTK8?si=7qPV6tm0X6qqRgQq"
          thumbnailSrc="/images/Screenshot%202026-07-06%20210350.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </section>
  )
}
