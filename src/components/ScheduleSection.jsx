import { useState } from "react";

// Helper to calculate column spans based on time
// Assume grid timeline from 09:00 AM to 11:00 PM (14 hours)
// Each hour is 2 cols, so 09:00 is col 1, 10:00 is col 3, etc. Total 28 cols.
const timeToGrid = (timeStr, ampm, durationHrs) => {
  const [hrs] = timeStr.split(":").map(Number);
  let hour24 = ampm === "PM" && hrs !== 12 ? hrs + 12 : hrs;
  if (ampm === "AM" && hrs === 12) hour24 = 0;

  // Timeline starts at 9 AM (9)
  const startCol = Math.max(1, (hour24 - 9) * 2 + 1);
  const span = Math.max(2, Math.round(durationHrs * 2)); // Minimum 1 hour span (2 cols)

  return { gridColumn: `${startCol} / span ${span}` };
};

const scheduleData = {
  day1: {
    title: "DAY 1",
    subtitle: "GENESIS",
    date: "7TH MARCH",
    events: [
      {
        id: "e1",
        time: "09:00",
        ampm: "AM",
        duration: 2, // hours
        title: "INAUGURATION",
        category: "CEREMONY",
        color: "#c9a94e",
      },
      {
        id: "e2",
        time: "11:00",
        ampm: "AM",
        duration: 3,
        title: "AAKRITI (FASHION)",
        category: "CULTURAL",
        color: "#ec4899",
      },
      {
        id: "e3",
        time: "02:00",
        ampm: "PM",
        duration: 4,
        title: "SURAKRITI (SINGING)",
        category: "CULTURAL",
        color: "#10b981",
      },
      {
        id: "e4",
        time: "06:00",
        ampm: "PM",
        duration: 2,
        title: "THE FOLK DIARYZ",
        category: "PERFORMANCE",
        color: "#e8845a",
      },
      {
        id: "e5",
        time: "08:00",
        ampm: "PM",
        duration: 3,
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
        time: "10:00",
        ampm: "AM",
        duration: 3,
        title: "ANUKRITI (DANCE)",
        category: "CULTURAL",
        color: "#f97316",
      },
      {
        id: "e7",
        time: "01:00",
        ampm: "PM",
        duration: 4,
        title: "MUSICON (BANDS)",
        category: "TECHNICAL", // Reusing category color for demo
        color: "#7c3aed",
      },
      {
        id: "e8",
        time: "05:00",
        ampm: "PM",
        duration: 3,
        title: "VALEDICTORY",
        category: "CEREMONY",
        color: "#c9a94e",
      },
      {
        id: "e9",
        time: "08:00",
        ampm: "PM",
        duration: 3,
        title: "TRAP STAGE",
        category: "PERFORMANCE",
        color: "#a855f7",
      },
    ],
  },
};

// Timeline hours to display on the header (09:00 AM to 11:00 PM)
const hours = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];

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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* ── Header Area ── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-center text-center mb-20">
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
      <div className="max-w-7xl mx-auto px-4 md:px-16 mb-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Day Hexagon Toggles */}
          <div className="flex gap-4">
            {Object.entries(scheduleData).map(([key, data]) => {
              const isActive = activeDay === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDay(key)}
                  className="relative group transition duration-300 w-36 h-24 flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
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

      {/* ── Grid Timeline Container ── */}
      <div className="max-w-[1400px] mx-auto px-4 overflow-x-auto pb-8 scrollbar-hide">
        <div className="min-w-[1000px] bg-[#111]/80 backdrop-blur-md border border-accent/20 rounded-md overflow-hidden shadow-2xl">
          {/* Header Row (Hours) */}
          <div className="flex border-b border-accent/20 bg-accent/5">
            {/* Left label column */}
            <div className="w-48 shrink-0 flex flex-col justify-center px-6 py-4 border-r border-accent/20">
              <span className="text-[0.6rem] font-bold tracking-[3px] text-accent mb-1">
                {currentData.title} · {currentData.subtitle}
              </span>
            </div>

            {/* Hours grid (28 columns = 14 hours * 2 half-hours) */}
            <div className="flex-1 grid grid-cols-28">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="col-span-2 relative flex items-center px-3 py-4 border-r border-white/5 last:border-r-0"
                >
                  <span className="text-[0.6rem] font-bold tracking-[1px] text-text-dim/80">
                    {hour}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Events Row */}
          <div className="flex bg-bg/50 relative">
            {/* Background vertical grid lines */}
            <div className="absolute inset-0 left-48 flex pointer-events-none">
              <div className="flex-1 grid grid-cols-28">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`border-r ${i % 2 === 0 ? "border-white/5" : "border-transparent"}`}
                  />
                ))}
              </div>
            </div>

            {/* Left label column */}
            <div className="w-48 shrink-0 flex items-center px-6 py-8 border-r border-accent/20 bg-[#111]/90 z-10">
              <span className="text-xs font-bold tracking-[2px] text-text">
                MAIN STAGE
              </span>
            </div>

            {/* Events absolute grid tracking */}
            <div className="flex-1 grid grid-cols-28 gap-y-4 p-4 relative z-10">
              {currentData.events.map((event) => (
                <div
                  key={event.id}
                  className="group relative h-12 rounded-[3px] border transition duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  tabIndex={0}
                  style={{
                    ...timeToGrid(event.time, event.ampm, event.duration),
                    backgroundColor: `${event.color}15`,
                    borderColor: `${event.color}40`,
                    boxShadow: `inset 4px 0 0 0 ${event.color}`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: `${event.color}20` }}
                  />

                  <div className="w-full h-full flex items-center px-4 whitespace-nowrap overflow-hidden">
                    <span className="text-[0.7rem] font-bold tracking-[1px] text-text group-hover:text-white transition-colors truncate">
                      {event.title}
                    </span>
                    <span className="text-[0.6rem] font-medium tracking-[1px] text-text-dim ml-3 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                      Click for details
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
