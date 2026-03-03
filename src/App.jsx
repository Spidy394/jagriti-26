import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import TeamSection from "./components/TeamSection";
import SponsorsSection from "./components/SponsorsSection";

const App = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />

      {/* Placeholder section so scroll effects can be tested */}
      <section className="section-placeholder" id="events">
        <p className="section-placeholder__text">Events coming soon</p>
      </section>

      <SponsorsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default App;
