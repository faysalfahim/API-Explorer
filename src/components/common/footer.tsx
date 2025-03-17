import { BookOpen } from "lucide-react"


const Footer = () => {
  return (
    <footer className="bg-white">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 md:order-2">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Internal Documentation</span>
            <BookOpen className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Support</span>
            <span className="h-6 w-6 flex items-center justify-center rounded-full border border-gray-400">?</span>
          </a>
        </div>
        <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
          &copy; 2025 Internal API Explorer. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer;