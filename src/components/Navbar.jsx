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

    // Entrance: fade in the nav after hero text appears
    const playEntranceAnimation = () => {
      gsap.fromTo(
        nav,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.5, ease: "power3.out" },
      );
    };

    window.addEventListener("preloaderComplete", playEntranceAnimation);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("preloaderComplete", playEntranceAnimation);
    };
  }, []);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => setMenuOpen(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        style={{ opacity: 0 }}
        className={`fixed top-0 left-0 w-full flex items-center justify-between transition-colors duration-400 ease-in-out ${
          menuOpen ? "z-110" : "z-100"
        } ${
          scrolled
            ? "bg-bg/60 backdrop-blur-lg py-3 px-4 sm:px-6 md:px-10"
            : "py-5 px-4 sm:px-6 md:px-10"
        }`}
      >
        {/* Left: logo + brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Jagriti"
            className={`w-auto object-contain transition-[height] duration-400 ${
              scrolled ? "h-11" : "h-16"
            }`}
          />
          <a
            href="#"
            className="font-['Samarkan',serif] text-[1.6rem] text-accent tracking-[2px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
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
                className="nav-link font-['Space_Grotesk',sans-serif] text-[0.85rem] font-medium tracking-[1.5px] uppercase text-text-dim relative transition-colors duration-300 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:text-text rounded-sm px-1 py-0.5"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          id="nav-register-btn"
          href="https://forms.gle/bzqzBgswUN2khZ8L9"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block font-['Space_Grotesk',sans-serif] text-[0.8rem] font-semibold tracking-[1.5px] uppercase text-bg bg-accent border-none py-[0.6rem] px-6 cursor-pointer transition duration-300 hover:bg-accent-hover hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm no-underline"
        >
          Register
        </a>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.25 cursor-pointer bg-transparent border-none p-2.5 z-110 min-w-11 min-h-11 items-center justify-center"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          id="nav-hamburger"
        >
          <span
            className={`block w-6 h-0.5 bg-text transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-x-1.25 translate-y-1.25" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text transition-transform duration-300 ${
              menuOpen ? "-rotate-45 translate-x-1.25 -translate-y-1.25" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-bg/96 z-105 flex-col items-center justify-center gap-8 ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-['Space_Grotesk',sans-serif] text-[1.2rem] font-medium tracking-[3px] uppercase text-text-dim transition-colors duration-300 hover:text-accent active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-4 py-3 min-h-13 flex items-center"
            onClick={handleLinkClick}
          >
            {link}
          </a>
        ))}
        <a
          href="https://forms.gle/bzqzBgswUN2khZ8L9"
          target="_blank"
          rel="noopener noreferrer"
          className="font-['Space_Grotesk',sans-serif] text-[0.8rem] font-semibold tracking-[1.5px] uppercase text-bg bg-accent border-none py-[0.8rem] px-8 cursor-pointer transition duration-300 hover:bg-accent-hover active:bg-accent-hover hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm no-underline min-h-13 flex items-center"
          onClick={handleLinkClick}
        >
          Register
        </a>
      </div>
    </>
  );
};

export default Navbar;
