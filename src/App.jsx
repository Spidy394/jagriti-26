import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import TeamSection from "./components/TeamSection";
import SponsorsSection from "./components/SponsorsSection";
import EventsSection from "./components/EventsSection";
import BandLineupSection from "./components/BandLineupSection";
import ScheduleSection from "./components/ScheduleSection";

const App = () => {
  return (
    <>
      <main className="relative z-10 bg-bg flex flex-col">
        <Navbar />
        <HeroSection />
        <AboutSection />

        <EventsSection />

        <BandLineupSection />

        <ScheduleSection />

        <SponsorsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default App;
