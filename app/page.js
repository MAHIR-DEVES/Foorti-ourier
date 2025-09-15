

import ClientReview from "./components/landing/ClientReview";
import DeliveryCalculator from "./components/landing/DeliveryCalc";
import Accordion from "./components/landing/Faq";
import FeaturesLogo from "./components/landing/FeaturesLogo";
import HeroSection from "./components/landing/HeroSection";
import ServicesSection from "./components/landing/ServiceCard";
import TrackParcel from "./components/landing/TrackParcel";
import LandingLayout from "./landing/layout";



export default  function Home() {

  return (
    <LandingLayout>
        <HeroSection />
        <TrackParcel />
        <FeaturesLogo />
        <ServicesSection />
        <DeliveryCalculator />
        <ClientReview />
        <Accordion />
    </LandingLayout>
  );
}
