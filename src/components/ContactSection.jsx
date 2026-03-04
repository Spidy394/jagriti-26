import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { LuCalendarDays } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

const infos = [
  {
    icon: <HiOutlineLocationMarker size={22} />,
    label: "Venue",
    lines: [
      "Govt. College of Engineering & Ceramic Technology",
      "73 Abinash Chandra Banerjee Lane, Beliaghata",
      "Kolkata — 700 010, West Bengal",
    ],
    link: "https://maps.google.com/?q=Government+College+of+Engineering+and+Ceramic+Technology+Kolkata",
    linkLabel: "Open in Maps →",
  },
  {
    icon: <LuCalendarDays size={22} />,
    label: "Event Dates",
    lines: ["7th & 8th March 2026", "Two days of culture, music & art"],
    link: null,
  },
  {
    icon: <HiOutlineMail size={22} />,
    label: "Get in Touch",
    lines: ["jagriti@gcect.ac.in"],
    link: "mailto:jagriti@gcect.ac.in",
    linkLabel: "Send a Mail →",
  },
];

const ContactSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-bg-raised overflow-hidden py-24 md:py-32"
    >
      {/* Decorative accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        {/* Header */}
        <div className="contact-anim mb-16 md:mb-20">
          <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[5px] uppercase text-accent mb-3">
            Get in Touch
          </p>
          <h2 className="font-['Samarkan',serif] text-5xl md:text-6xl text-text tracking-[2px] leading-none">
            Contact
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
          {/* Left — Info cards */}
          <div className="flex flex-col divide-y divide-border">
            {infos.map((info) => (
              <div
                key={info.label}
                className="contact-anim flex gap-5 py-8 first:pt-0 last:pb-0"
              >
                {/* Icon */}
                <span className="mt-0.5 text-accent shrink-0">{info.icon}</span>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[3px] uppercase text-accent/70">
                    {info.label}
                  </p>
                  {info.lines.map((line, i) => (
                    <p
                      key={i}
                      className="font-['Space_Grotesk',sans-serif] text-[0.875rem] text-text-dim leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                  {info.link && (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 font-['Space_Grotesk',sans-serif] text-[0.78rem] font-semibold tracking-[1px] text-accent hover:text-accent-hover transition-colors"
                    >
                      {info.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right — Google Maps embed */}
          <div className="contact-anim flex flex-col gap-0">
            {/* Label bar — sits above the map, not over it */}
            <div className="flex items-center gap-2 px-4 py-2 bg-bg border border-b-0 border-border rounded-t-sm">
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[2px] uppercase text-text-dim/60">
                GCECT, Beliaghata, Kolkata
              </span>
            </div>
            <div className="relative min-h-85 lg:min-h-105 border border-border rounded-b-sm overflow-hidden">
              <iframe
                title="GCECT Location"
                src="https://maps.google.com/maps?q=Government+College+of+Engineering+and+Ceramic+Technology+Kolkata&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full absolute inset-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 right-1/4 w-100 h-50 bg-accent/4 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default ContactSection;
