import Hero from "../ui/Hero";
import HeroTitling from "../ui/HeroTitling";
import MeetTheArtist from "../ui/MeetTheArtist";
import NewArtWorks from "../ui/NewArtWorks";
import PopularCategories from "../ui/PopularCategories";

export default function Homepage() {
  return (
    <>
      <Hero />
      <HeroTitling />
      <PopularCategories />
      <NewArtWorks />
      <MeetTheArtist />
    </>
  );
}
