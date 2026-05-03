import { useLogoSoup } from "react-logo-soup";

const LOGOS = [
  { src: "/logos/Dreaminfluence.webp", alt: "Dreaminfluence" },
  { src: "/logos/Inkassomægleren.svg", alt: "Inkassomægleren" },
  { src: "/logos/Intellecto_Dark_Logo.png", alt: "Intellecto" },
  { src: "/logos/Likvido.dk_idTWJepgi3_1.svg", alt: "Likvido" },
  { src: "/logos/RykkerPortalenlogo_transparent.png", alt: "RykkerPortalen" },
  { src: "/logos/Tje.webp", alt: "Tje.dk" },
  { src: "/logos/cheaplogo_retina.png", alt: "Cheap Energy" },
  { src: "/logos/dansk-haandvaerk.png", alt: "Dansk Håndværk" },
  { src: "/logos/faga.png", alt: "Faga" },
  { src: "/logos/smvdanmark.svg", alt: "SMV Danmark" },
  { src: "/logos/vimeso-logo.webp", alt: "Vimeso" },
];

export default function Partners() {
  const { normalizedLogos, isReady } = useLogoSoup({
    logos: LOGOS,
    baseSize: 48,
    backgroundColor: [43, 79, 191],
    cropToContent: true,
  });

  if (!isReady) return null;

  const logos = [...normalizedLogos, ...normalizedLogos];

  return (
    <div
      className="w-full mt-8"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "20px",
      }}
    >
      <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] text-center mb-6">
        Brugt af virksomheder i hele Danmark
      </p>
      <div
        className="overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, white 10%, white 90%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, white 10%, white 90%, transparent)",
        }}
      >
        <div
          className="flex items-center"
          style={{
            width: "max-content",
            gap: "48px",
            animation: "logo-ticker 35s linear infinite",
          }}
        >
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo.croppedSrc || logo.src}
              alt={logo.alt}
              width={logo.normalizedWidth}
              height={logo.normalizedHeight}
              className="object-contain transition-opacity duration-300 shrink-0"
              style={{ opacity: 0.75, filter: "brightness(0) invert(1)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
