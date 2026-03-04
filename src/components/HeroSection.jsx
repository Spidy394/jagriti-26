import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Set initial positions (before animation)
    gsap.set(
      [
        ".hero__college",
        ".hero__presents",
        ".hero__line",
        ".hero__title-block", // animate block, not inner gradient-text
        ".hero__tagline",
        ".hero__cta-group",
      ],
      { y: 40, opacity: 0 },
    );
    // title-year needs y offset too
    gsap.set(".hero__title-year", { y: 40 });

    // ── Entrance timeline ──
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".hero__college", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.4,
    })
      .to(
        ".hero__presents",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4",
      )
      .to(
        ".hero__line",
        {
          opacity: 1,
          y: 0,
          scaleX: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.3",
      )
      .to(
        ".hero__title-block",
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.4",
      )
      .to(
        ".hero__tagline",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.3",
      )
      .to(
        ".hero__meta",
        {
          opacity: 0.6,
          y: 0,
          duration: 0.6,
        },
        "-=0.2",
      )
      .to(
        ".hero__cta-group",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.2",
      )
      .to(
        ".hero__scroll",
        {
          opacity: 0.6,
          duration: 0.8,
        },
        "-=0.2",
      );

    // Set the line to start from center (scaleX: 0)
    gsap.set(".hero__line", { scaleX: 0 });

    // ── Scroll-triggered parallax ──
    gsap.to(content, {
      y: -100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Video parallax
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.25,
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    // Scroll indicator fades out
    gsap.to(".hero__scroll", {
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "5% top",
        end: "15% top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero sticky top-0 z-0 w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background video */}
      <div className="hero__video-wrap absolute inset-0 z-1">
        <video
          ref={videoRef}
          className="hero__video w-full h-full object-cover blur-[6px] scale-110"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="hero__overlay absolute inset-0 z-2 bg-bg/65"></div>

      {/* Content — dramatic Sanskriti-style layout */}
      <div
        ref={contentRef}
        className="hero__content relative z-3 flex flex-col items-center text-center gap-1.5 px-8 w-full max-w-[1100px] max-[700px]:gap-0.5"
      >
        <p className="hero__college font-['Space_Grotesk',sans-serif] text-[0.8rem] md:text-[0.8rem] max-md:text-[0.6rem] font-medium tracking-[3px] md:tracking-[4px] uppercase text-text-dim opacity-0 mb-0">
          GOVERNMENT COLLEGE OF ENGINEERING &amp; CERAMIC TECHNOLOGY
        </p>

        <p className="hero__presents font-['Playfair_Display',Georgia,serif] text-[0.95rem] font-normal italic text-text-dim tracking-[2px] opacity-0 mb-1">
          presents
        </p>

        {/* Decorative horizontal line */}
        <div className="hero__line w-[80%] md:w-[60%] max-w-[500px] h-px bg-accent opacity-0 origin-center mb-1"></div>

        {/* Title block */}
        <div className="hero__title-block flex items-baseline justify-center gap-0 leading-none select-none text-balance">
          {/* Main title colourized like the logo with a gold gradient */}
          <h1 className="hero__title-main font-['Samarkan',serif] text-[clamp(3.5rem,16vw,6rem)] md:text-[clamp(5rem,18vw,14rem)] tracking-[4px] m-0 text-balance">
            Jagriti
          </h1>
          <span className="hero__title-year font-['Samarkan',serif] text-[clamp(1.8rem,7vw,3rem)] md:text-[clamp(2.5rem,8vw,6rem)] text-accent tracking-[2px] leading-[0.85] relative top-[0.15em]">
            26
          </span>
        </div>

        <p className="hero__tagline font-['Samarkan',serif] text-[0.85rem] md:text-[clamp(0.9rem,2.2vw,1.5rem)] font-normal italic text-text-dim tracking-[2px] md:tracking-[3px] mt-2 opacity-0">
          Where Creativity Meets Celebration ...
        </p>

        <div className="hero__cta-group flex flex-col md:flex-row gap-4 mt-4 opacity-0 items-center w-full md:w-auto">
          <button
            className="hero__btn hero__btn--primary font-['Space_Grotesk',sans-serif] text-[0.8rem] font-semibold tracking-[2px] uppercase py-[0.85rem] px-[2.2rem] w-full max-w-[280px] md:w-auto text-center cursor-pointer transition-transform duration-300 bg-accent text-bg border-none hover:bg-accent-hover hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
            id="hero-explore-btn"
          >
            Explore Events
          </button>
          <a
            id="hero-register-btn"
            href="https://forms.gle/bzqzBgswUN2khZ8L9"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--outline font-['Space_Grotesk',sans-serif] text-[0.8rem] font-semibold tracking-[2px] uppercase py-[0.85rem] px-[2.2rem] w-full max-w-[280px] md:w-auto text-center cursor-pointer transition-transform duration-300 bg-transparent text-text border border-border hover:border-accent hover:text-accent hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm no-underline"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-3 flex flex-col items-center gap-2 opacity-0">
        <span className="hero__scroll-text font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[3px] uppercase text-text-dim">
          Scroll
        </span>
        <div className="hero__scroll-line w-px h-[40px] bg-border relative overflow-hidden after:content-[''] after:absolute after:-top-full after:left-0 after:w-full after:h-full after:bg-accent after:animate-scroll-pulse"></div>
      </div>
    </section>
  );
};

export default HeroSection;
