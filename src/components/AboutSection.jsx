import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Placeholder card – swap src for a real image when ready */
const PhotoCard = ({ className, gradient, label, imgSrc }) => (
  <div className={`absolute ${className}`}>
    {/* Clean White Frame */}
    <div className="w-full h-full p-1 border border-white/20 md:p-1.5 bg-white/95 rounded-sm_rgba(255,255,255,0.1)] transition-all duration-500 group cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]">
      {/* Inner masked container */}
      <div className="relative w-full h-full overflow-hidden rounded-xs">
        {imgSrc ? (
          <>
            <img
              src={imgSrc}
              alt={label}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Dark overlay so the label remains readable */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent flex items-end">
              <span className="p-3 text-[0.6rem] font-['Space_Grotesk',sans-serif] tracking-[2px] uppercase text-white/80 z-10 transition-colors duration-300 group-hover:text-accent">
                {label}
              </span>
            </div>
          </>
        ) : (
          <div
            className={`w-full h-full ${gradient} flex items-end transition-transform duration-700 ease-out group-hover:scale-110`}
          >
            <span className="p-3 text-[0.6rem] font-['Space_Grotesk',sans-serif] tracking-[2px] uppercase text-white/40">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards scroll-triggered entrance
      gsap.fromTo(
        ".about-card",
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // Text side entrance
      gsap.fromTo(
        ".about-text-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 bg-bg overflow-hidden py-24 md:py-32"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-125 h-125 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Left: Floating Photo Cards ── */}
          <div
            ref={cardsRef}
            className="relative h-75 sm:h-105 md:h-125"
          >
            {/* Card 1 — top, slightly rotated */}
            <PhotoCard
              className="about-card w-[55%] aspect-4/3 top-0 right-6 rotate-3deg z-10"
              gradient="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
              label=""
              imgSrc="/images/image3.png"
            />
            {/* Card 2 — center-left, larger, base */}
            <PhotoCard
              className="about-card w-[68%] aspect-4/3 top-1/2 -translate-y-1/2 left-0 -rotate-2 z-20"
              gradient="bg-gradient-to-br from-[#1c1400] via-[#2e2000] to-[#3d2900]"
              label=""
              imgSrc="/images/image1.jpg"
            />
            {/* Card 3 — bottom-right, small accent card */}
            <PhotoCard
              className="about-card w-[42%] aspect-4/3 bottom-0 right-0 rotate-2d z-30"
              gradient="bg-gradient-to-br from-[#1a0020] via-[#2d0040] to-[#1a0020]"
              label=""
              imgSrc="/images/image2.jpeg"
            />

            {/* Decorative accent dot */}
            <div className="absolute bottom-6 left-[55%] w-3 h-3 rounded-full bg-accent opacity-60 z-40" />
            <div className="absolute top-6 left-[30%] w-2 h-2 rounded-full bg-accent/40 z-40" />
          </div>
          {/* ── Right: Text Content ── */}
          <div ref={textRef} className="flex flex-col gap-6">
            {/* Category label */}
            <p className="about-text-item font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[5px] uppercase text-accent">
              Cultural Fest · GCECT
            </p>

            {/* Heading */}
            <div className="about-text-item">
              <h2 className="font-['Samarkan',serif] text-5xl md:text-6xl text-text leading-[0.95] tracking-[2px] text-balance">
                Jagriti
              </h2>
            </div>

            {/* Decorative line */}
            <div className="about-text-item w-16 h-px bg-accent opacity-50" />

            {/* Description */}
            <p className="about-text-item font-['Space_Grotesk',sans-serif] text-[0.9rem] text-text-dim leading-relaxed">
              Jagriti is the flagship cultural event of Government College of
              Engineering &amp; Ceramic Technology — formerly known as Cera-fest
              — established to foster bonds among students from different
              regions and walks of life. Every year the campus transforms into a
              hub of creativity, expression, and celebration, bringing together
              talent from across departments under one vibrant platform.
            </p>

            {/* Dates */}
            <p className="about-text-item font-['Space_Grotesk',sans-serif] text-[0.78rem] font-semibold tracking-[4px] uppercase text-accent/80">
              7th &amp; 8th March 2026
            </p>

            {/* CTA */}
            <div className="about-text-item mt-2">
              <a
                href="https://drive.google.com/file/d/1bxS8ufX3yoj_QoshRUfyxGAL7URjxvof/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-['Space_Grotesk',sans-serif] text-[0.8rem] font-semibold tracking-[2px] uppercase bg-accent text-bg py-3 px-8 transition duration-300 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,169,78,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
              >
                View Brochure
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
