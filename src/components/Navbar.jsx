import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = ["Events", "Schedule", "Sponsors", "Contact"];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Scroll-triggered background
    ScrollTrigger.create({
      trigger: document.body,
      start: "80px top",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    // Entrance: fade in the nav after hero text loads
    gsap.fromTo(
      nav,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.8, ease: "power3.out" },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        style={{ opacity: 0 }}
        className={`fixed top-0 left-0 w-full z-100 flex items-center justify-between transition-all duration-400 ease-in-out ${
          scrolled ? "bg-bg/60 backdrop-blur-lg py-3 px-10" : "py-5 px-10"
        }`}
      >
        {/* Left: logo + brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Jagriti"
            className={`w-auto object-contain transition-all duration-400 ${
              scrolled ? "h-11" : "h-16"
            }`}
          />
          <a
            href="#"
            className="font-['Samarkan',serif] text-[1.6rem] text-accent tracking-[2px] select-none"
          >
            Jagriti
          </a>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="nav-link font-['Space_Grotesk',sans-serif] text-[0.85rem] font-medium tracking-[1.5px] uppercase text-text-dim relative transition-colors duration-300 hover:text-text"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          id="nav-register-btn"
          className="hidden md:block font-['Space_Grotesk',sans-serif] text-[0.8rem] font-semibold tracking-[1.5px] uppercase text-bg bg-accent border-none py-[0.6rem] px-6 cursor-pointer transition-all duration-300 hover:bg-accent-hover hover:-translate-y-px"
        >
          Register
        </button>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.25 cursor-pointer bg-transparent border-none p-1 z-110"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span
            className={`block w-6 h-0.5 bg-text transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-x-1.25 translate-y-1.25" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text transition-all duration-300 ${
              menuOpen ? "-rotate-45 translate-x-1.25 -translate-y-1.25" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-bg/96 z-105 flex-col items-center justify-center gap-10 ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-['Space_Grotesk',sans-serif] text-[1.2rem] font-medium tracking-[3px] uppercase text-text-dim transition-colors duration-300 hover:text-accent"
            onClick={handleLinkClick}
          >
            {link}
          </a>
        ))}
        <button
          className="font-['Space_Grotesk',sans-serif] text-[0.8rem] font-semibold tracking-[1.5px] uppercase text-bg bg-accent border-none py-[0.6rem] px-6 cursor-pointer transition-all duration-300 hover:bg-accent-hover hover:-translate-y-px"
          onClick={handleLinkClick}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Navbar;
