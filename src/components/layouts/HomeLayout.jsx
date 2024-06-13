import AboutUs from "../pages/home/about-us/AboutUs";
import HeroImagesGallary from "../pages/home/hero/HeroImagesGallary";
import HomeNavbar from "../pages/home/hero/HomeNavbar";
import LogoBanner from "../pages/home/hero/LogoBanner";
import WelcomeBanner from "../pages/home/hero/WelcomeBanner";
import ServicesSection from "../pages/home/services-section/ServicesSection";

export default function HomeLayout() {
  return (
    <div className="relative flex flex-col">
      <div className="flex justify-center">
        <LogoBanner />
        <HomeNavbar />
        <WelcomeBanner />
      </div>
      <HeroImagesGallary />

      <div className="self-center w-[75%]">
        <AboutUs />
        <ServicesSection />
      </div>
    </div>
  );
}
