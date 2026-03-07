import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const stairsRef = useRef([]);
  const contentRef = useRef(null);
  const [complete, setComplete] = useState(false);

  // Setup refs for stairs safely
  const setStairRef = (el, index) => {
    stairsRef.current[index] = el;
  };

  useEffect(() => {
    // Lock body scroll while preloading safely
    document.body.classList.add("overflow-hidden");

    // Quick glitch/decode effect for text lines
    const titleRef1 = document.createElement("div");
    const titleRef2 = document.createElement("div");
    
    const finalLine1 = "are you ready for the";
    const finalLine2 = "madness ??";
    const glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?~";

    const textContainer = textRef.current;
    if (textContainer) {
      textContainer.innerHTML = "";
      
      titleRef1.className = "block overflow-hidden";
      titleRef2.className = "block overflow-hidden";
      
      titleRef1.innerText = finalLine1;
      titleRef2.innerText = finalLine2;
      
      textContainer.appendChild(titleRef1);
      textContainer.appendChild(titleRef2);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("overflow-hidden");
        setComplete(true);
        window.dispatchEvent(new CustomEvent("preloaderComplete"));
      },
    });

    // Initial state
    gsap.set(stairsRef.current, { yPercent: 0 });

    const dummy = { progress: 0 };

    // 1. Decode glitch effect
    tl.to(dummy, {
      progress: 1,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        const p = dummy.progress;
        
        const applyGlitch = (el, finalText) => {
          if (p === 1) {
             el.innerText = finalText;
             return;
          }
          let glitched = "";
          for (let i = 0; i < finalText.length; i++) {
             if (finalText[i] === " ") {
               glitched += " ";
               continue;
             }
             // Character lock-in based on overall progress + random variance
             const charProgress = (i / finalText.length) * 0.7; // Spread locking
             if (p > charProgress + 0.3) {
               glitched += finalText[i];
             } else {
               // Randomly flip some early locks back to glitch briefly
               if (Math.random() > 0.9 && p < 0.8) {
                  glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
               } else if (p > charProgress) {
                  glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
               } else {
                  // Not reached yet
                  glitched += Math.random() > 0.5 ? "-" : "_";
               }
             }
          }
          el.innerText = glitched;
        };

        if (titleRef1 && titleRef2) {
           // Small flicker effect to opacity
           textContainer.style.opacity = Math.random() > 0.95 && p < 0.5 ? 0.3 : 1;
           applyGlitch(titleRef1, finalLine1);
           applyGlitch(titleRef2, finalLine2);
        }
      },
    })
      // 3. Hold
      .to({}, { duration: 0.6 })
      // 4. Fade out text content before stairs lift
      .to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      })
      // 5. Stairs lift up staggered
      .to(
        stairsRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          stagger: 0.1, // Creates the stair effect
          ease: "power4.inOut",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 w-full h-full pointer-events-none"
    >
      {/* The Stairs Elements */}
      <div className="absolute inset-0 flex w-full h-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => setStairRef(el, i)}
            className="h-full bg-bg grow pointer-events-auto"
            style={{ width: "20%" }}
          ></div>
        ))}
      </div>

      {/* Content over the stairs */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center w-full h-full pointer-events-none px-4 md:px-12"
      >
        <div className="flex items-center justify-center leading-none select-none text-center w-full">
          <div
            ref={textRef}
            className="font-['Space_Grotesk',sans-serif] text-[clamp(1.2rem,5vw,2.5rem)] md:text-[clamp(1.5rem,4vw,3rem)] tracking-[2px] md:tracking-[4px] m-0 leading-[1.4]"
            style={{
              background: "linear-gradient(90deg, #e3c162, #ffe082, #c9a94e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paddingBottom: "0.15em",
              overflow: "visible",
            }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
