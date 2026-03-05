import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: "Debojit Das",
    role: "President",
    initials: "DD",
    img: "/images/team/Debojit_Das.webp",
  },
  {
    name: "Srit Biswas",
    role: "General Secretary",
    initials: "SB",
    img: "/images/team/Srit_Biswas.webp",
  },
  {
    name: "Rudrajyoty Mahata",
    role: "Vice President",
    initials: "RM",
    img: "/images/team/Rudrajyoty_Mahata.webp",
  },
  {
    name: "Rajarshee Hazari",
    role: "Treasurer",
    initials: "RH",
    img: "images/team/Rajarshee_Hazari.webp",
  },
  {
    name: "Debrup Das",
    role: "Game Secretary",
    initials: "DD",
    img: "images/team/Debrup_Das.webp",
  },
  {
    name: "Bidwattar Kar",
    role: "Cultural Secretary",
    initials: "BK",
    img: "images/team/Bidwattar_Kar.webp",
  },
  {
    name: "Pratik Haldar",
    role: "Asst. General Secretary",
    initials: "PH",
    img: "images/team/Pratik_Haldar.webp",
  },
  {
    name: "Epsita Dutta",
    role: "Public Relation Lead",
    initials: "ED",
    img: "images/team/Epsita_Dutta.webp",
  },
];

/* Swap src="/team/filename.jpg" into <img> once you have real photos */
const MemberCard = ({ member }) => (
  <div
    className="team-card group relative flex flex-col overflow-hidden border border-border bg-bg transition-[border-color,transform,box-shadow] duration-500
      hover:border-accent/40 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(201,169,78,0.12)]
      [@media(hover:none)]:border-accent/30
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
    style={{ opacity: 0 }}
    tabIndex={0}
  >
    {/* Photo area */}
    <div className="relative aspect-3/4 overflow-hidden bg-bg-raised">
      {/* Gradient background — warm gold tint always on touch, hover-only on desktop */}
      <div
        className="absolute inset-0 bg-linear-to-br from-[#111] via-[#222] to-[#0d0d0d] transition-colors duration-500
        group-hover:from-[#1a1400] group-hover:via-[#2a2000]
        [@media(hover:none)]:from-[#1a1400] [@media(hover:none)]:via-[#2a2000] [@media(hover:none)]:to-[#0d0d0d]"
      />

      {/* Photo — grayscale on desktop until hover; full color always on touch */}
      {member.img && (
        <img
          src={member.img}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500
            grayscale opacity-80
            group-hover:grayscale-0 group-hover:opacity-100
            [@media(hover:none)]:grayscale-0 [@media(hover:none)]:opacity-100"
        />
      )}

      {/* Gold shimmer overlay — hover on desktop, always on touch */}
      <div
        className="absolute inset-0 bg-linear-to-t from-accent/10 to-transparent transition-opacity duration-500
        opacity-0 group-hover:opacity-100
        [@media(hover:none)]:opacity-100"
      />
    </div>

    {/* Info */}
    <div className="px-5 py-4 flex flex-col gap-1 border-t border-border group-hover:border-accent/30 [@media(hover:none)]:border-accent/20 transition-colors duration-300 relative">
      <p className="font-['Space_Grotesk',sans-serif] text-[0.65rem] font-semibold tracking-[3px] uppercase text-accent/70 relative z-10">
        {member.role}
      </p>

      {/* Name — revealed on hover (desktop) / always visible on touch */}
      <div className="overflow-hidden">
        <h3
          className="font-['Space_Grotesk',sans-serif] text-[0.95rem] font-semibold text-text leading-snug transition-all duration-500 ease-out
          opacity-0 translate-y-full
          group-hover:opacity-100 group-hover:translate-y-0
          [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
        >
          {member.name}
        </h3>
      </div>
    </div>

    {/* Bottom accent line — hover on desktop / always visible on touch */}
    <div
      className="absolute bottom-0 left-0 h-0.5 bg-accent transition-[width] duration-500
      w-0 group-hover:w-full
      [@media(hover:none)]:w-full [@media(hover:none)]:opacity-40"
    />
  </div>
);

const TeamSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        ".team-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
      // Cards — staggered
      gsap.to(".team-card", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative bg-bg py-24 md:py-32 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        {/* Header */}
        <div className="team-header flex flex-col gap-4 mb-16 md:mb-20">
          <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[5px] uppercase text-accent">
            The People Behind Jagriti
          </p>
          <h2 className="font-['Samarkan',serif] text-5xl md:text-6xl text-text tracking-[2px] leading-none text-balance">
            Meet the Team
          </h2>
          <div className="w-16 h-px bg-accent/50 mt-1" />
        </div>

        {/* Cards grid */}
        <div className="team-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {members.map((member, i) => (
            <MemberCard key={member.name + i} member={member} index={i} />
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/3 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default TeamSection;
