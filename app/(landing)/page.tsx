import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";
import Landingabout from "@/components/landing-about";
import Landingapi from "@/components/landing-api";
import Landingfooter from "@/components/landing-footer";

const LandingPage = () => {
  return ( 
    <div className="overflow-hidden">
      <LandingNavbar/>
      <LandingHero />
      <Landingabout/>
      <LandingContent />
      <Landingapi/>
      <Landingfooter/>
    </div>
   );
}
 
export default LandingPage;

