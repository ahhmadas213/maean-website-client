import HeroSection from "@/components/HeroSection";
import InitiativesSection from "@/components/InitiativesSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import MediaSection from "@/components/MediaSection";
import SuccessPartnerSection from "@/components/SuccessPartnerSection";
// import StatisticsSection from "@/components/StatisticsSection";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <InitiativesSection />
      {/* <StatisticsSection /> */}
      <SuccessPartnerSection />
      <LatestNewsSection />
      <MediaSection />
    </div>
  );
}
