import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F7F6F2] px-6 py-20 pt-32">
      <div className="max-w-md w-full bg-white p-10 sm:p-14 border border-[#E8E6E1] text-center space-y-6">
        <p className="text-[#C98A5B] text-[10px] uppercase tracking-[0.28em] font-montserrat font-medium">
          404 — Not Found
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
          Page not located.
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
          The requested page does not exist. Explore our selected projects or return home.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0D2B4C] hover:bg-[#C98A5B] text-white text-[11px] uppercase tracking-[0.18em] font-montserrat font-medium transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#E8E6E1] text-gray-700 hover:text-[#1A1A1A] text-[11px] uppercase tracking-[0.18em] font-montserrat font-medium transition-colors"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
