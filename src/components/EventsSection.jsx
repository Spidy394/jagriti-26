import { useState } from "react";

/* ─── Mobile accordion card (tap-to-expand) ─── */
const EventMobileCard = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border rounded-sm overflow-hidden">
      {/* Header — always visible */}
      <button
        className="w-full flex items-center gap-4 p-4 text-left relative overflow-hidden"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        style={{
          background: `linear-gradient(135deg, ${event.color} 0%, #0a0a0a 100%)`,
        }}
      >
        {/* Accent top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: event.accentColor, opacity: 0.8 }}
        />

        {event.img && (
          <img
            src={event.img}
            alt={event.name}
            className="w-14 h-14 object-cover rounded-sm shrink-0 opacity-90"
          />
        )}

        <div className="flex-1 min-w-0">
          <p
            className="font-['Space_Grotesk',sans-serif] text-[0.6rem] tracking-[3px] uppercase font-semibold mb-0.5"
            style={{ color: event.accentColor }}
          >
            {event.category}
          </p>
          <h3 className="font-['Samarkan',serif] text-xl text-text tracking-[2px] leading-tight">
            {event.name}
          </h3>
          <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] text-text-dim italic">
            {event.subtitle}
          </p>
        </div>

        {/* Chevron */}
        <svg
          className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Expandable content */}
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-150" : "max-h-0"}`}
      >
        <div className="relative p-5 flex flex-col gap-3">
          {/* Background image */}
          {event.img && (
            <img
              src={event.img}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Dark + accent gradient overlay so text stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${event.color}ee 0%, #0a0a0acc 60%, #0a0a0af5 100%)`,
            }}
          />

          {/* Content sits above the bg */}
          <div className="relative z-10 flex flex-col gap-3">
            <p className="font-['Space_Grotesk',sans-serif] text-[0.82rem] text-text-dim leading-relaxed">
              {event.description}
            </p>

            <ul className="flex flex-col gap-1.5">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: event.accentColor }}
                  />
                  <span className="font-['Space_Grotesk',sans-serif] text-[0.75rem] text-text-dim">
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10">
              <div>
                <p className="font-['Space_Grotesk',sans-serif] text-[0.6rem] tracking-[3px] uppercase text-text-dim/60 mb-0.5">
                  Prize Pool
                </p>
                <p
                  className="font-['Space_Grotesk',sans-serif] text-lg font-bold"
                  style={{ color: event.accentColor }}
                >
                  {event.prize}
                </p>
              </div>
              <div className="text-right">
                <p className="font-['Space_Grotesk',sans-serif] text-[0.6rem] tracking-[3px] uppercase text-text-dim/60 mb-0.5">
                  Registration
                </p>
                <p className="font-['Space_Grotesk',sans-serif] text-[0.8rem] font-semibold text-text">
                  {event.regFee}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[2px] uppercase text-text-dim/60">
                {event.date}
              </p>
              <a
                href="https://forms.gle/bzqzBgswUN2khZ8L9"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[2px] uppercase px-4 py-2 border rounded-sm transition duration-300 active:opacity-70 min-h-11 flex items-center"
                style={{
                  borderColor: event.accentColor,
                  color: event.accentColor,
                }}
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const events = [
  {
    id: "musicon",
    name: "Musicon",
    subtitle: "Battle of Bands",
    category: "Music",
    date: "8th March, 2026",
    prize: "₹2,000",
    regFee: "₹800 / team",
    color: "#1a0a2e",
    accentColor: "#7c3aed",
    img: "/images/events/musicon.jpg", // placeholder — swap for /images/musicon.jpg
    description:
      "An inter-college band competition where music groups battle it out on stage. Bring your instruments and your passion.",
    highlights: [
      "10+5 min per team",
      "Own instruments required",
      "No programmed music",
    ],
  },
  {
    id: "anukriti",
    name: "Anukriti",
    subtitle: "Dance Competition",
    category: "Dance",
    date: "8th March, 2026",
    prize: "₹6,000",
    regFee: "₹199 / solo",
    color: "#1a0a00",
    accentColor: "#f97316",
    img: "/images/events/anukriti.jpg", // placeholder — swap for /images/anukriti.jpg
    description:
      "Solo, duet, and group categories across eastern, western, and mixed styles. Express your artistry on the biggest stage.",
    highlights: [
      "Solo / Duet / Group",
      "Eastern · Western · Mix",
      "Changing rooms provided",
    ],
  },
  {
    id: "aakriti",
    name: "Aakriti",
    subtitle: "Fashion Show",
    category: "Fashion",
    date: "7th March, 2026",
    prize: "₹2,000",
    regFee: "₹999 / team",
    color: "#0a0a1a",
    accentColor: "#ec4899",
    img: "/images/events/aakriti.jpg", // placeholder — swap for /images/aakriti.jpg
    description:
      "An inter-college fashion show competition. Bring creativity, style, and storytelling to the runway.",
    highlights: ["15+2 min per team", "Max 20 members", "Open to all colleges"],
  },
  {
    id: "surakriti",
    name: "Surakriti",
    subtitle: "Solo Singing",
    category: "Singing",
    date: "7th March, 2026",
    prize: "₹1,000",
    regFee: "₹149 / individual",
    color: "#001a0a",
    accentColor: "#10b981",
    img: "/images/events/surakriti.jpg", // placeholder — swap for /images/surakriti.jpg
    description:
      "An inter-college solo singing competition open to any collegiate singing enthusiast. Mics provided, bring your instruments.",
    highlights: [
      "5+1 min per individual",
      "Mics & plug-ins provided",
      "Own instruments required",
    ],
  },
];

const COLLAPSED_WIDTH = "80px";
const EXPANDED_WIDTH = "520px";

const EventCard = ({ event, isActive, onHover, onLeave, isAnyActive }) => {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover}
      className="relative h-full overflow-hidden cursor-pointer shrink-0 transition-[width,min-width] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
      tabIndex={0}
      style={{
        width: isActive
          ? EXPANDED_WIDTH
          : isAnyActive
            ? COLLAPSED_WIDTH
            : "25%",
        minWidth: isActive ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
      }}
    >
      {/* Background image / gradient */}
      {event.img ? (
        <img
          src={event.img}
          alt={event.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isActive ? "opacity-30" : "opacity-100"}`}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${event.color} 0%, #0a0a0a 100%)`,
          }}
        />
      )}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Accent gradient glow */}
      <div
        className="absolute inset-0 opacity-30 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, ${event.accentColor}55 0%, transparent 65%)`,
          opacity: isActive ? 0.45 : 0.2,
        }}
      />

      {/* Dark vignette bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      {/* ── Collapsed label (vertical, shown when NOT active) ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end pb-10 transition-opacity duration-300"
        style={{
          opacity: isActive ? 0 : 1,
          transitionDelay: isActive ? "0ms" : "200ms",
        }}
      >
        <p
          className="font-['Space_Grotesk',sans-serif] text-[0.6rem] tracking-[4px] uppercase whitespace-nowrap"
          style={{
            color: event.accentColor,
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {event.category}
        </p>
        <p
          className="font-['Samarkan',serif] text-[1.1rem] tracking-[2px] text-text mt-3 whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {event.name}
        </p>
      </div>

      {/* ── Expanded content ── */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-10 transition-[opacity,transform] duration-500"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(16px)",
          transitionDelay: isActive ? "200ms" : "0ms",
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        {/* Category badge */}
        <p
          className="font-['Space_Grotesk',sans-serif] text-[0.65rem] font-semibold tracking-[5px] uppercase mb-3"
          style={{ color: event.accentColor }}
        >
          {event.category}
        </p>

        {/* Event name */}
        <h2 className="font-['Samarkan',serif] text-5xl text-text leading-[0.9] tracking-[3px] mb-1 text-balance">
          {event.name}
        </h2>
        <p className="font-['Space_Grotesk',sans-serif] text-[0.78rem] text-text-dim tracking-[2px] uppercase mb-5 italic">
          {event.subtitle}
        </p>

        {/* Accent divider */}
        <div
          className="w-10 h-px mb-5 opacity-70"
          style={{ background: event.accentColor }}
        />

        {/* Description */}
        <p className="font-['Space_Grotesk',sans-serif] text-[0.82rem] text-text-dim leading-relaxed mb-5 max-w-85">
          {event.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.5 mb-6">
          {event.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ background: event.accentColor }}
              />
              <span className="font-['Space_Grotesk',sans-serif] text-[0.75rem] text-text-dim tracking-[1px]">
                {h}
              </span>
            </li>
          ))}
        </ul>

        {/* Meta row */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-['Space_Grotesk',sans-serif] text-[0.62rem] tracking-[3px] uppercase text-text-dim/60 mb-0.5">
              Prize Pool
            </p>
            <p
              className="font-['Space_Grotesk',sans-serif] text-xl font-bold"
              style={{ color: event.accentColor }}
            >
              {event.prize}
            </p>
          </div>
          <div className="text-right">
            <p className="font-['Space_Grotesk',sans-serif] text-[0.62rem] tracking-[3px] uppercase text-text-dim/60 mb-0.5">
              Registration
            </p>
            <p className="font-['Space_Grotesk',sans-serif] text-[0.82rem] font-semibold text-text">
              {event.regFee}
            </p>
          </div>
        </div>

        {/* Date + CTA */}
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/10">
          <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] tracking-[3px] uppercase text-text-dim/70">
            {event.date}
          </p>
          <a
            href="https://forms.gle/bzqzBgswUN2khZ8L9"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[2px] uppercase px-5 py-2 border transition duration-300 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
            style={{
              borderColor: event.accentColor,
              color: event.accentColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = event.accentColor;
              e.currentTarget.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = event.accentColor;
            }}
          >
            Register
          </a>
        </div>
      </div>

      {/* Thin accent top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-500"
        style={{
          background: event.accentColor,
          opacity: isActive ? 0.8 : 0.2,
        }}
      />
    </div>
  );
};

const EventsSection = () => {
  const [activeId, setActiveId] = useState(events[0].id);

  return (
    <section id="events" className="relative z-10 bg-bg w-full overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12 flex flex-col items-center text-center">
        <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[5px] uppercase text-accent mb-4">
          Jagriti '26
        </p>
        <h2 className="font-['Samarkan',serif] text-5xl md:text-6xl text-text leading-[0.95] tracking-[2px] text-balance">
          Events
        </h2>
        <div className="w-16 h-px bg-accent opacity-50 mt-5" />
      </div>

      {/* ── Mobile: vertical tap-to-expand cards (hidden on md+) ── */}
      <div className="md:hidden flex flex-col px-4 pb-16 gap-3">
        {events.map((event) => (
          <EventMobileCard key={event.id} event={event} />
        ))}
      </div>

      {/* ── Desktop: horizontal hover accordion (hidden on mobile) ── */}
      <div
        className="hidden md:flex justify-center h-[82vh] min-h-140 max-h-215 w-full"
        onMouseLeave={() => setActiveId(events[0].id)}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isActive={activeId === event.id}
            isAnyActive={!!activeId}
            onHover={() => setActiveId(event.id)}
            onLeave={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
