import type { SVGProps } from "react"

export const SolarLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 160 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <text x="0" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="26" fontWeight="800" fill="#111827">Verba</text>
    <text x="72" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="26" fontWeight="400" fill="#374151">Lex</text>
    <text x="118" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="26" fontWeight="800" fill="#f97316">AI</text>
    <circle cx="154" cy="20" r="4" fill="#f97316" />
  </svg>
)
