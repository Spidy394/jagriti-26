import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const FooterContent = () => {
  const exploreLinks = [
    { label: "Events", href: "#events" },
    { label: "Schedule", href: "#schedule" },
    { label: "Gallery", href: "#gallery" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Contact", href: "#contact" },
  ];

  const participateLinks = [
    {
      label: "Register Now",
      href: "https://forms.gle/bzqzBgswUN2khZ8L9",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    { label: "Become a Sponsor", href: "#sponsors" },
    { label: "Volunteer", href: "#contact" },
  ];

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/jagriti_official._/",
      icon: <FaInstagram size={20} />,
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      icon: <FaYoutube size={20} />,
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: <FaFacebook size={20} />,
    },
    {
      label: "Twitter/X",
      href: "https://twitter.com",
      icon: <FaXTwitter size={20} />,
    },
  ];

  return (
    <footer className="bg-bg border-t border-border">
      {/* Gold accent top line */}
      <div className="h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-10 py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-['Samarkan',serif] text-4xl text-accent tracking-[3px] leading-none">
                Jagriti
              </span>
              <span className="font-['Samarkan',serif] text-2xl text-accent/70 tracking-[2px] leading-none relative top-[0.1em] ml-1">
                26
              </span>
            </div>
            <p className="font-['Space_Grotesk',sans-serif] text-[0.85rem] text-text-dim leading-relaxed max-w-65">
              The annual cultural fest of Government College of Engineering
              &amp; Ceramic Technology, Kolkata. Where creativity meets
              celebration.
            </p>
            {/* Divider */}
            <div className="w-12 h-px bg-accent opacity-40 mt-1" />
            <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] text-text-dim/50 tracking-[2px] uppercase">
              © 2026 Jagriti GCECT. All rights reserved.
            </p>
            <p className="font-['Space_Grotesk',sans-serif] text-[0.65rem] text-text-dim/35 tracking-[1px]">
              made by{" "}
              <a
                href="https://github.com/Spidy394"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent/70 transition-colors duration-300"
              >
                Shubhodeep
              </a>
            </p>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[4px] uppercase text-accent mb-6">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-['Space_Grotesk',sans-serif] text-[0.875rem] text-text-dim tracking-[1px] transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Participate column */}
          <div>
            <h3 className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[4px] uppercase text-accent mb-6">
              Participate
            </h3>
            <ul className="flex flex-col gap-3">
              {participateLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                    className="font-['Space_Grotesk',sans-serif] text-[0.875rem] text-text-dim tracking-[1px] transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-semibold tracking-[4px] uppercase text-accent mb-6">
              Connect
            </h3>
            <div className="flex flex-wrap gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-dim transition-[color,transform] duration-300 hover:text-accent hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // Parallax reveal effect - moves from -50% to 0% (downward) as it is revealed
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { yPercent: -50 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full z-0">
      {/* Fixed layer: visually stays at the bottom of the viewport */}
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full pointer-events-auto"
      >
        <FooterContent />
      </div>

      {/* Invisible clone: ensures the document is exactly the right height for scrolling */}
      <div
        ref={triggerRef}
        className="invisible pointer-events-none select-none"
        aria-hidden="true"
      >
        <FooterContent />
      </div>
    </div>
  );
};

export default Footer;
