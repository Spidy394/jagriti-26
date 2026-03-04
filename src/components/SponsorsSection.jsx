import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Categories of sponsors for variety
const sponsorTiers = [
  {
    name: "Powered By",
    sponsors: [
      {
        name: "S-Gen Consortium Infra Pvt. Ltd.",
        img: "/images/sponcers/sen.jpeg",
      },
      {
        name: "Raj Ihira Projects Pvt. Ltd.",
        img: "/images/sponcers/raj.jpeg",
      },
    ],
  },
  {
    name: "Co-Powered By",
    sponsors: [
      {
        name: "Synapsis Medical Technologies Inc.",
        img: "/images/sponcers/synapsismedical.png",
      },
      // { name: "TCS", logo: "TCS" },
      // { name: "Cognizant", logo: "CTS" },
      // { name: "IBM", logo: "IBM" },
    ],
  },
  // {
  //   name: "Food Partners",
  //   sponsors: [
  //     { name: "Wow Momo", logo: "WM" },
  //     { name: "Keventers", logo: "KV" },
  //     { name: "Dominos", logo: "DP" },
  //   ],
  // },
];

const SponsorsSection = () => {
  const sectionRef = useRef(null);

  // Actual partner names for the marquee ribbon
  const tickerItems = [
    "S-Gen Consortium Infra",
    "Raj Ihira Projects",
    "Synapsis Medical",
    "S-Gen Consortium Infra",
    "Raj Ihira Projects",
    "Synapsis Medical",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".sponsor-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      // Tiers entrance
      gsap.fromTo(
        ".sponsor-tier",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sponsor-tiers-container",
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative bg-bg py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="sponsor-header flex flex-col items-center text-center gap-4 mb-16 md:mb-20">
          <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[5px] uppercase text-accent">
            Our Supporters
          </p>
          <h2 className="font-['Samarkan',serif] text-5xl md:text-6xl text-text tracking-[2px] leading-none text-balance">
            Sponsors
          </h2>
          <div className="w-16 h-px bg-accent/50 mt-1" />
        </div>

        {/* Categories / Tiers */}
        <div className="sponsor-tiers-container flex flex-col gap-12 md:gap-16 max-w-4xl mx-auto">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.name}
              className="sponsor-tier flex flex-col items-center gap-6"
            >
              <h3 className="font-['Space_Grotesk',sans-serif] text-[0.8rem] tracking-[4px] uppercase text-text-dim border-b border-accent/20 pb-2 px-6">
                {tier.name}
              </h3>

              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {tier.sponsors.map((sponsor, idx) => (
                  <div
                    key={idx}
                    className="group relative flex items-center justify-center w-40 h-28 md:w-56 md:h-32 bg-bg-raised border border-border rounded-sm transition duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(201,169,78,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    tabIndex={0}
                  >
                    {/* Placeholder or Logo Image */}
                    {sponsor.img ? (
                      <div className="w-full h-full p-2 group-hover:drop-shadow-[0_0_15px_rgba(201,169,78,0.5)] transition-all duration-500">
                        <img
                          src={sponsor.img}
                          alt={`${sponsor.name} logo`}
                          className="w-full h-full object-contain mix-blend-screen"
                        />
                      </div>
                    ) : (
                      <span className="font-['Samarkan',serif] text-3xl text-text-dim/40 group-hover:text-accent/60 transition-colors">
                        {sponsor.logo}
                      </span>
                    )}

                    {/* Tooltip for name */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="bg-bg border border-border px-3 py-1 font-['Space_Grotesk',sans-serif] text-[0.6rem] tracking-wider text-text-dim whitespace-nowrap rounded-sm shadow-xl">
                        {sponsor.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Scrolling Ticker Band (Decorative) */}
      <div className="relative mt-24 md:mt-32 w-full border-y border-border bg-bg-raised/30 overflow-hidden py-4 flex items-center">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-bg to-transparent z-10" />

        {/* Moving track — duplicated for seamless loop */}
        <div className="flex w-fit animate-[scroll_30s_linear_infinite] group hover:[animation-play-state:paused] whitespace-nowrap">
          {/* First set */}
          {tickerItems.map((item, i) => (
            <div key={`tick-1-${i}`} className="flex items-center gap-8 px-8">
              <span className="font-['Samarkan',serif] text-xl text-text-dim/30">
                {item}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
            </div>
          ))}
          {/* Second set (duplicate) for seamless loop */}
          {tickerItems.map((item, i) => (
            <div key={`tick-2-${i}`} className="flex items-center gap-8 px-8">
              <span className="font-['Samarkan',serif] text-xl text-text-dim/30">
                {item}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind custom animation defined in index.css needed for the ticker */}
    </section>
  );
};

export default SponsorsSection;
