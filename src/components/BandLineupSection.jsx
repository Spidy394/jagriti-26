import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bands = [
  {
    id: "broken-melody",
    name: "Broken Melody",
    genre: "Indie Rock",
    date: "7th March",
    time: "7:30 PM",
    accentColor: "#c9a94e",
    logo: null,
    img: "/images/broken_melody.webp",
    description:
      "Setting the stage ablaze on opening night, Broken Melody brings raw indie energy and soulful guitar riffs that will resonate long after the last note fades.",
    tag: "Opening Night",
  },
  {
    id: "folk-diaryz",
    name: "The Folk Diaryz",
    genre: "Folk · Acoustic",
    date: "7th March",
    time: "9:00 PM",
    accentColor: "#e8845a",
    logo: null,
    img: "/images/thefolkdiaryz.webp",
    description:
      "Weaving tales through acoustic strings and heartfelt vocals, The Folk Diaryz promise an intimate, spine-tingling journey through the soul of folk music.",
    tag: "Folk Night",
  },
  {
    id: "trap",
    name: "TRAP",
    genre: "Hip-Hop · Metal",
    date: "8th March",
    time: "8 PM",
    accentColor: "#a855f7",
    logo: null,
    img: "/images/trap.webp",
    description:
      "Closing Jagriti '26 with a thunderous bang — TRAP delivers hard-hitting beats and electrifying bass drops in a high-energy performance you won't forget.",
    tag: "Headliner",
  },
];

/* ── Placeholder SVG art (landscape ratio) ── */
const PlaceholderArt = ({ accentColor, id }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 360 320"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="360" height="320" fill="#0d0d0d" />
    <defs>
      <radialGradient id={`grd-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor={accentColor} stopOpacity="0.2" />
        <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="360" height="320" fill={`url(#grd-${id})`} />
    {[60, 120, 180, 240, 300].map((x) => (
      <line
        key={`v${x}`}
        x1={x}
        y1="0"
        x2={x}
        y2="320"
        stroke={accentColor}
        strokeOpacity="0.06"
        strokeWidth="1"
      />
    ))}
    {[80, 160, 240].map((y) => (
      <line
        key={`h${y}`}
        x1="0"
        y1={y}
        x2="360"
        y2={y}
        stroke={accentColor}
        strokeOpacity="0.06"
        strokeWidth="1"
      />
    ))}
    {/* Music note */}
    <g transform="translate(158,122)" fill={accentColor} opacity="0.22">
      <rect x="18" y="0" width="4" height="56" rx="2" />
      <rect x="0" y="0" width="22" height="4" rx="2" />
      <ellipse cx="9" cy="56" rx="9" ry="6" />
    </g>
  </svg>
);

/* ── Single landscape card ── */
const BandCard = ({ band, index }) => (
  <div
    className="relative flex flex-col md:flex-row overflow-hidden group w-full"
    style={{
      maxWidth: "680px",
      border: "1px solid #2a2a2a",
      borderRadius: "8px",
      background: "#0a0a0a",
      transition: "border-color 0.4s ease",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.borderColor = band.accentColor + "66")
    }
    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
  >
    {/* ── Left: image panel ── */}
    <div className="relative shrink-0 overflow-hidden w-full md:w-90 h-50 md:h-80">
      {band.img ? (
        <img
          src={band.img}
          alt={band.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <PlaceholderArt accentColor={band.accentColor} id={band.id} />
      )}

      {band.logo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={band.logo}
            alt={`${band.name} logo`}
            className="w-20 h-20 object-contain drop-shadow-2xl"
          />
        </div>
      )}

      {/* Hover tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${band.accentColor}1a 0%, transparent 60%)`,
        }}
      />

      {/* Index watermark */}
      <span
        className="absolute top-4 left-5 font-['Space_Grotesk',sans-serif] text-5xl font-bold select-none pointer-events-none"
        style={{ color: band.accentColor, opacity: 0.12, lineHeight: 1 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Tag badge */}
      <span
        className="absolute bottom-4 left-4 font-['Space_Grotesk',sans-serif] text-[0.55rem] font-semibold tracking-[4px] uppercase px-3 py-1"
        style={{
          background: band.accentColor,
          color: "#0a0a0a",
          borderRadius: "1px",
        }}
      >
        {band.tag}
      </span>
    </div>

    {/* ── Right: info panel ── */}
    <div className="flex flex-col justify-center px-6 md:px-8 py-6 flex-1 bg-[#111]">
      <p
        className="font-['Space_Grotesk',sans-serif] text-[0.6rem] font-semibold tracking-[5px] uppercase mb-2"
        style={{ color: band.accentColor }}
      >
        {band.genre}
      </p>

      <h3 className="font-['Samarkan',serif] text-3xl md:text-4xl text-text leading-[0.95] tracking-[2px] mb-3">
        {band.name}
      </h3>

      <div
        className="h-px mb-4 transition-[width] duration-500"
        style={{ width: "2.5rem", background: band.accentColor, opacity: 0.5 }}
      />

      <p className="font-['Space_Grotesk',sans-serif] text-[0.78rem] text-text-dim leading-relaxed mb-5 max-w-60">
        {band.description}
      </p>

      {/* Date / time */}
      <div className="flex items-center gap-5">
        <div>
          <p className="font-['Space_Grotesk',sans-serif] text-[0.55rem] tracking-[4px] uppercase text-text-dim/50 mb-0.5">
            Date
          </p>
          <p
            className="font-['Space_Grotesk',sans-serif] text-sm font-semibold"
            style={{ color: band.accentColor }}
          >
            {band.date}
          </p>
        </div>
        {band.time && (
          <>
            <div
              className="w-px self-stretch opacity-20"
              style={{ background: band.accentColor }}
            />
            <div>
              <p className="font-['Space_Grotesk',sans-serif] text-[0.55rem] tracking-[4px] uppercase text-text-dim/50 mb-0.5">
                Doors Open
              </p>
              <p
                className="font-['Space_Grotesk',sans-serif] text-sm font-semibold"
                style={{ color: band.accentColor }}
              >
                {band.time}
              </p>
            </div>
          </>
        )}
      </div>
    </div>

    {/* Accent top edge */}
    <div
      className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-500 opacity-20 group-hover:opacity-80"
      style={{ background: band.accentColor }}
    />
  </div>
);

/* ── Section ── */
const BandLineupSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.5}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (index === 0) return;
        gsap.set(card, { y: window.innerHeight });
        tl.to(card, { y: index * 35, ease: "none" });
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="lineup" ref={sectionRef} className="relative bg-bg w-full">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12 flex flex-col items-center text-center">
        <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[5px] uppercase text-accent mb-4">
          Live Performances
        </p>
        <h2 className="font-['Samarkan',serif] text-5xl md:text-6xl text-text leading-[0.95] tracking-[2px] text-balance">
          Band Line-up
        </h2>
        <div className="w-16 h-px bg-accent opacity-50 mt-5" />
      </div>

      {/* ── Mobile: simple vertical stack (md:hidden) ── */}
      <div className="md:hidden px-4 pb-16 flex flex-col gap-6 items-center">
        {bands.map((band, i) => (
          <BandCard key={band.id} band={band} index={i} />
        ))}
      </div>

      {/* ── Desktop: GSAP Pinned stacking container (hidden on mobile) ── */}
      {/* overflow-hidden so the cards coming from below don't leak out of the section bounds */}
      <div
        ref={containerRef}
        className="hidden md:flex relative w-full min-h-105 pb-12 justify-center items-start overflow-hidden mt-10"
      >
        <div className="relative w-full max-w-5xl px-4 md:px-8 flex justify-center">
          {bands.map((band, i) => (
            <div
              key={band.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute w-full flex justify-center pointer-events-auto"
              style={{
                top: i === 0 ? "0px" : "0px", // GSAP will handle the Y offsets
                zIndex: i + 10,
              }}
            >
              <BandCard band={band} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer for breathing room after un-pin */}
      <div className="h-40 w-full" />
    </section>
  );
};

export default BandLineupSection;
