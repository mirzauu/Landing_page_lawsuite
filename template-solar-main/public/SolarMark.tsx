import type { SVGProps } from "react"

export const SolarMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="40" height="40" rx="10" fill="#f97316" fillOpacity="0.15" />
    <text x="20" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="800" fill="#f97316" textAnchor="middle">VL</text>
  </svg>
)
