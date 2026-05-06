"use client"

import React, { useState } from "react"
import Link from "next/link"
import { RiArrowLeftLine, RiCheckLine, RiMailSendLine, RiSparklingLine } from "@remixicon/react"
import { Button } from "@/components/Button"

export default function RequestAccessPage() {
  const [email, setEmail] = useState("")
  const [suggestion, setSuggestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://formspree.io/f/mbdwgvya", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          message: suggestion
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-linear-to-b from-orange-100/50 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation */}
      <div className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <RiArrowLeftLine className="size-4" />
          Back to home
        </Link>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          
          <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden backdrop-blur-xl">
            {isSubmitted ? (
              // Success State
              <div className="p-10 md:p-14 text-center animate-in fade-in zoom-in duration-500">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 mb-6 ring-8 ring-green-50/50">
                  <RiCheckLine className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
                  Thank you!
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We&apos;ve added your email to our priority waitlist. We&apos;re working hard to get everything perfect, and you&apos;ll be among the first to know when we launch.
                </p>
                <Link href="/">
                  <Button className="w-full h-12 bg-gray-900 hover:bg-black text-white rounded-xl font-medium shadow-md">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            ) : (
              // Form State
              <div className="p-8 md:p-12 animate-in fade-in duration-500">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <RiSparklingLine className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                    We&apos;re Crafting Something Special
                  </h1>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                    VerbaLex AI is currently in early access. Leave your details below and we&apos;ll personally invite you as soon as our systems are ready for you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiMailSendLine className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-4 py-3 sm:text-sm border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 shadow-sm"
                        placeholder="you@lawfirm.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="suggestion" className="block text-sm font-semibold text-gray-900 flex justify-between">
                      <span>How can we help you?</span>
                      <span className="text-gray-400 font-normal">Optional</span>
                    </label>
                    <textarea
                      id="suggestion"
                      name="message"
                      rows={4}
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      className="block w-full px-4 py-3 sm:text-sm border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 shadow-sm resize-none"
                      placeholder="Tell us what features you'd love to see or what problems you're trying to solve..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-orange-500/20 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding to waitlist...
                      </span>
                    ) : (
                      "Notify Me When Ready"
                    )}
                  </button>
                </form>
                
                <p className="mt-6 text-center text-xs text-gray-400">
                  We respect your privacy. No spam, ever.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
