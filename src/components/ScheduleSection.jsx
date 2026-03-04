import { useState } from "react";

const scheduleData = {
  day1: {
    title: "DAY 1",
    subtitle: "GENESIS",
    date: "7TH MARCH",
    events: [
      {
        id: "e1",
        time: "04:00",
        ampm: "PM",
        duration: 1, // hours
        title: "INAUGURATION",
        category: "CEREMONY",
        color: "#c9a94e",
      },
      {
        id: "e2",
        time: "05:00",
        ampm: "PM",
        duration: 1.5,
        title: "AAKRITI (FASHION)",
        category: "CULTURAL",
        color: "#ec4899",
      },
      {
        id: "e3",
        time: "06:30",
        ampm: "PM",
        duration: 1.5,
        title: "SURAKRITI (SINGING)",
        category: "CULTURAL",
        color: "#10b981",
      },
      {
        id: "e4",
        time: "08:00",
        ampm: "PM",
        duration: 1.5,
        title: "THE FOLK DIARYZ",
        category: "PERFORMANCE",
        color: "#e8845a",
      },
      {
        id: "e5",
        time: "09:30",
        ampm: "PM",
        duration: 1.5,
        title: "BROKEN MELODY",
        category: "PERFORMANCE",
        color: "#dc2626",
      },
    ],
  },
  day2: {
    title: "DAY 2",
    subtitle: "EVOLUTION",
    date: "8TH MARCH",
    events: [
      {
        id: "e6",
        time: "04:00",
        ampm: "PM",
        duration: 1.5,
        title: "ANUKRITI (DANCE)",
        category: "CULTURAL",
        color: "#f97316",
      },
      {
        id: "e7",
        time: "05:30",
        ampm: "PM",
        duration: 2.5,
        title: "MUSICON (BANDS)",
        category: "TECHNICAL", // Reusing category color for demo
        color: "#7c3aed",
      },
      {
        id: "e8",
        time: "08:00",
        ampm: "PM",
        duration: 1.5,
        title: "VALEDICTORY",
        category: "CEREMONY",
        color: "#c9a94e",
      },
      {
        id: "e9",
        time: "09:30",
        ampm: "PM",
        duration: 2,
        title: "TRAP STAGE",
        category: "PERFORMANCE",
        color: "#a855f7",
      },
    ],
  },
};

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState("day1");
  const currentData = scheduleData[activeDay];

  return (
    <section
      id="schedule"
      className="relative bg-bg w-full overflow-hidden py-32 border-t border-white/5 font-['Space_Grotesk',sans-serif]"
    >
      {/* ── Background Detail ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34h-58.34l-.83-.83V0h58.34zM53.8 1.66H2.49v56.68H53.8V1.66z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-125 bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ── Header Area ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 flex flex-col items-center text-center mb-20">
        <p className="font-['Space_Grotesk',sans-serif] text-[0.7rem] font-bold tracking-[6px] uppercase text-accent mb-4">
          FESTIVAL SCHEDULE
        </p>
        <h2 className="font-['Samarkan',serif] text-5xl md:text-7xl text-text leading-none tracking-[2px] mb-6 text-balance">
          Event Timeline
        </h2>
        <p className="font-['Space_Grotesk',sans-serif] text-sm md:text-base text-text-dim max-w-2xl leading-relaxed">
          Explore two days of non-stop excitement. From cultural showdowns to
          electrifying performances, here's your guide to Jagriti '26.
        </p>
      </div>

      {/* ── Top Controls (Days + Legends) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 mb-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Day Hexagon Toggles */}
          <div className="flex gap-4">
            {Object.entries(scheduleData).map(([key, data]) => {
              const isActive = activeDay === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDay(key)}
                  className="relative group transition duration-300 w-28 h-20 sm:w-36 sm:h-24 flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  {/* Hexagon shape using clip-path */}
                  <div
                    className={`absolute inset-0 transition duration-300 ${
                      isActive
                        ? "bg-accent scale-105 shadow-[0_0_30px_rgba(201,169,78,0.2)]"
                        : "bg-transparent border border-white/20 group-hover:border-accent/50"
                    }`}
                    style={{
                      clipPath:
                        "polygon(15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%, 0 50%)",
                    }}
                  />

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span
                      className={`text-[0.6rem] font-bold tracking-[2px] mb-1 ${isActive ? "text-bg" : "text-text-dim"}`}
                    >
                      {data.date}
                    </span>
                    <span
                      className={`text-xl font-black tracking-[2px] mb-0.5 ${isActive ? "text-bg" : "text-text"}`}
                    >
                      {data.title}
                    </span>
                    <span
                      className={`text-[0.55rem] font-bold tracking-[3px] uppercase ${isActive ? "text-bg opacity-80" : "text-accent"}`}
                    >
                      {data.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Vertical Timeline ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-16 relative">
        {/* Central Vertical Line */}
        <div className="absolute left-9.75 md:left-29.75 top-6 bottom-6 w-px bg-accent/20" />

        <div className="flex flex-col gap-10">
          {currentData.events.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={event.id}
                className={`relative flex items-center md:items-start gap-6 md:gap-0 group cursor-pointer ${
                  isLeft ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Mobile Time Column (Always Left) */}
                <div className="md:hidden w-16 shrink-0 flex flex-col items-end pt-5">
                  <span className="text-xl font-['Samarkan',serif] text-accent tracking-[1px] leading-none">
                    {event.time}
                  </span>
                  <span className="text-[0.65rem] font-bold tracking-[2px] text-text-dim mt-1">
                    {event.ampm}
                  </span>
                </div>

                {/* Desktop Time Column (Alternating) */}
                <div
                  className={`hidden md:flex w-1/2 shrink-0 flex-col pt-5 ${
                    isLeft ? "items-start pl-12" : "items-end pr-12"
                  }`}
                >
                  <span className="text-3xl font-['Samarkan',serif] text-accent tracking-[1px] leading-none transition-transform duration-500 group-hover:scale-105">
                    {event.time}
                  </span>
                  <span className="text-[0.65rem] font-bold tracking-[2px] text-text-dim mt-1">
                    {event.ampm}
                  </span>
                </div>

                {/* Node on the Line */}
                <div
                  className="relative md:absolute md:left-1/2 md:-ml-2.25 z-10 w-4 h-4 rounded-full bg-bg border-2 mt-5.5 md:mt-6 shrink-0 transition-transform duration-500 group-hover:scale-[1.3] group-hover:bg-accent/10"
                  style={{
                    borderColor: event.color,
                    boxShadow: `0 0 15px ${event.color}30`,
                  }}
                />

                {/* Event Card (Alternating) */}
                <div
                  className={`flex-1 md:w-1/2 ${
                    isLeft ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div
                    className="bg-bg-raised/40 backdrop-blur-sm border border-white/5 rounded-md p-6 transition-all duration-300 group-hover:bg-bg-raised/80 group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
                    style={{
                      borderLeftColor: event.color,
                      borderLeftWidth: "3px",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(to ${isLeft ? "left" : "right"}, transparent, ${event.color}08)`,
                      }}
                    />

                    <p
                      className={`text-[0.65rem] font-bold tracking-[3px] mb-2 uppercase flex ${
                        isLeft ? "md:justify-end" : "md:justify-start"
                      }`}
                      style={{ color: event.color }}
                    >
                      {event.category}{" "}
                      <span className="text-text-dim px-2">·</span>{" "}
                      {event.duration} HOURS
                    </p>
                    <h3
                      className={`text-xl md:text-2xl font-bold text-text mb-3 tracking-[1px] group-hover:text-white transition-colors text-balance md:text-${isLeft ? "right" : "left"}`}
                    >
                      {event.title}
                    </h3>
                    <p
                      className={`text-[0.8rem] text-text-dim/80 leading-relaxed font-['Space_Grotesk',sans-serif] md:text-${isLeft ? "right" : "left"}`}
                    >
                      Join us at the main stage for an incredible showcase.
                      Click here for more details about performers and stage
                      information.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
