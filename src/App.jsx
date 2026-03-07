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
import Preloader from "./components/Preloader";

const App = () => {
  return (
    <>
      <Preloader />
      <main className="relative z-10 bg-bg">
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
