import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import {
  WhoWeAre,
  HowWeWork,
  Impact,
  Insights,
} from "../components/LandingSections";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <WhoWeAre />
      <HowWeWork />
      <Impact />
      <Insights />
      <Footer />
    </div>
  );
};

export default LandingPage;
