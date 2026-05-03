import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { href: "#process", label: "Sådan virker det" },
  { href: "#pricing", label: "Pris" },
  { href: "#proof", label: "Om os" },
  { href: "#faq", label: "FAQ" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const barColor = isScrolled ? "bg-text-primary" : "bg-white";

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-[100] px-6 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "py-[10px]" : "py-4"
      }`}
    >
      {/* Pill */}
      <div
        className={`relative z-[100] mx-auto flex items-center px-4 md:px-6 py-3 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "max-w-[680px] bg-white/82 backdrop-blur-[20px] backdrop-saturate-[180%] border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
            : "max-w-[1100px] border-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="/"
          className={`flex items-center gap-2 text-sm font-bold tracking-[0.1px] no-underline transition-colors duration-500 ${
            isScrolled ? "text-text-primary" : "text-white"
          }`}
        >
          <svg
            className="w-5 h-6 shrink-0"
            viewBox="0 0 58.4 67.67"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              className={`transition-colors duration-500 ${isScrolled ? "fill-brand-blue" : "fill-white"}`}
              points="58.4 16.92 58.4 35.11 56.05 33.75 53.13 32.06 50.79 30.71 47.65 28.88 34.77 21.42 29.97 18.64 24.41 21.87 19.15 24.91 13.89 21.87 19.15 18.82 24.71 15.6 29.97 12.55 35.23 15.6 40.03 18.38 47.65 22.79 53.13 25.97 53.13 13.86 58.4 16.92"
              opacity={0.85}
            />
            <polygon
              className={`transition-colors duration-500 ${isScrolled ? "fill-brand-blue" : "fill-white"}`}
              points="47.65 10.69 47.65 16.78 45.22 15.37 40.42 12.59 35.16 9.54 29.2 6.09 24.01 9.1 18.75 12.14 13.19 15.37 10.54 16.9 7.93 18.41 5.27 19.96 5.27 22.82 8.76 24.84 10.54 25.87 14.02 27.89 18.82 30.67 34.84 39.95 29.58 42.99 29.58 42.99 13.56 33.71 10.54 31.96 8.76 30.93 8.76 30.93 5.27 28.91 3.5 27.89 0 25.86 0 16.92 2.68 15.37 5.27 13.87 7.93 12.32 10.54 10.81 13.5 9.1 18.75 6.05 23.95 3.05 29.2 0 34.46 3.05 40.42 6.5 45.67 9.54 47.65 10.69"
            />
            <polygon
              className={`transition-colors duration-500 ${isScrolled ? "fill-brand-blue" : "fill-white"}`}
              points="58.4 41.56 58.4 50.69 53.13 53.74 47.65 56.92 44.8 58.57 39.54 61.62 34.35 64.63 34.34 64.63 29.09 67.67 23.83 64.63 18.55 61.57 10.54 56.93 10.54 50.84 13.3 52.43 18.55 55.48 18.56 55.48 23.81 58.52 29.09 61.58 34.28 58.57 39.54 55.52 45.37 52.14 47.65 50.83 53.13 47.65 53.13 44.6 50.49 43.07 47.65 41.42 45.23 40.02 39.97 36.98 23.95 27.69 29.21 24.65 45.23 33.93 47.65 35.33 50.49 36.98 53.13 38.51 55.74 40.02 58.4 41.56"
              opacity={0.85}
            />
            <polygon
              className={`transition-colors duration-500 ${isScrolled ? "fill-brand-blue" : "fill-white"}`}
              points="45.35 46.04 40.1 49.09 40.1 49.09 34.27 52.47 29.01 55.51 18.49 49.42 10.54 44.81 5.27 41.76 5.27 53.87 0 50.82 0 32.61 2.93 34.31 5.27 35.67 7.73 37.09 10.54 38.72 23.75 46.37 29.01 49.42 29.01 49.42 34.84 46.04 40.1 43 45.35 46.04"
            />
          </svg>
          smallclaims
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-1 mx-auto list-none p-0 m-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`text-[13.5px] font-medium px-[14px] py-[6px] rounded-full no-underline transition-all duration-300 ${
                  isScrolled
                    ? "text-text-secondary hover:text-text-primary hover:bg-surface-1"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <a
            href={isScrolled ? "/signup" : "https://my.smallclaims.ai"}
            className={`px-4 md:px-5 py-2 rounded-full text-white text-[13px] font-semibold no-underline border transition-all duration-300 ${
              isScrolled
                ? "bg-brand-blue border-brand-blue shadow-[0_2px_8px_rgba(66,113,240,0.3)] hover:bg-brand-blue-dark hover:border-brand-blue-dark"
                : "bg-white/15 border-white/20 backdrop-blur-sm hover:bg-white/25 hover:border-white/[0.35]"
            }`}
          >
            {isScrolled ? "Opret sag" : "Log på"}
          </a>

          {/* Burger (mobile only) */}
          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={isMenuOpen}
            className={`md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-full transition-colors duration-300 ${
              isScrolled ? "hover:bg-surface-1" : "hover:bg-white/10"
            }`}
          >
            <span
              className={`w-5 h-[2px] rounded-full transition-all duration-300 ${barColor} ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`w-5 h-[2px] rounded-full transition-all duration-300 ${barColor} ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`w-5 h-[2px] rounded-full transition-all duration-300 ${barColor} ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-[99] bg-signin-gradient flex flex-col items-center justify-center gap-1 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute top-0 inset-x-0 h-[200px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {/* Links */}
        <div
          className={`relative flex flex-col items-center gap-1 transition-all duration-300 delay-100 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="px-8 py-3 text-white/60 text-[1.75rem] font-semibold tracking-[-0.5px] no-underline rounded-2xl transition-colors duration-200 hover:text-white hover:bg-white/10"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          className={`relative mt-10 px-8 py-3 rounded-full no-underline bg-white text-brand-blue text-[15px] font-bold shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all duration-300 delay-150 hover:bg-white/90 hover:scale-[1.02] ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Opret din sag
        </a>
      </div>
    </nav>
  );
}
