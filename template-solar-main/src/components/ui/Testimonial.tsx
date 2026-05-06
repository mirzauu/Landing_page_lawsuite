import Image from "next/image"

export default function Testimonial() {
  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl shadow-[#366A79]/70">
      <div className="absolute inset-0 object-cover">
        <Image
          alt="background clouds"
          src="/images/clouds.png"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-20 mb-20 p-8 sm:p-14 lg:p-24">
        <div className="">
          <blockquote className="relative max-w-2xl text-xl leading-relaxed tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
            <p className="before:absolute before:top-0 before:right-full before:content-['“'] after:text-gray-900/70 after:content-['”']">
              <strong className="font-semibold">
                VerbaLex AI transformed our transcript processing.
              </strong>{" "}
              <span className="text-gray-900/70">
                Their AI agents perfectly align our audio and accurately structure complex terminology, reducing our manual review time by 90% while improving precision.
              </span>
            </p>
          </blockquote>
        </div>
        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="relative shrink-0 rounded-full bg-white/15 p-0.5 ring-1 ring-white/20">
            <Image
              alt="Dr. Sarah Miller"
              src="/images/smiller.jpeg"
              width={56}
              height={56}
              className="rounded-full border object-contain"
            />
          </div>
          <div>
            <div className="text-base font-medium text-gray-900">
              Sarah Miller, Esq.
            </div>
            <div className="text-sm text-[#C33621]/80">
              Managing Partner
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
