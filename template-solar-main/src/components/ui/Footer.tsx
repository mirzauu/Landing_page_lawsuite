import Link from "next/link"
import { SolarLogo } from "../../../public/SolarLogo"

const CURRENT_YEAR = new Date().getFullYear()

const Footer = () => {
  return (
    <div className="px-4 xl:px-0 border-t border-gray-100 mt-20">
      <footer
        id="footer"
        className="relative mx-auto flex max-w-6xl flex-col items-center justify-center py-16 text-center"
      >
        <Link
          href="/"
          className="mb-8 flex items-center font-medium text-gray-700 select-none"
        >
          <SolarLogo className="w-24" />
          <span className="sr-only">VeriScript AI Logo</span>
        </Link>
        
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-gray-900">
            Maker & Developer:{" "}
            <Link 
              href="https://paperpie.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 transition-colors underline decoration-orange-500/30 underline-offset-4"
            >
              paperpie.io
            </Link>
          </p>
          <p className="text-xs text-gray-400">
            &copy; {CURRENT_YEAR} VeriScript AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
