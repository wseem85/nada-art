import { useAllImages } from "../features/images/useAllImages";
import Hero from "../ui/Hero";
import HeroTitling from "../ui/HeroTitling";
import MeetTheArtist from "../ui/MeetTheArtist";
import NewArtWorks from "../ui/NewArtWorks";
import PopularCategories from "../ui/PopularCategories";
import Spinner from "../ui/Spinner";

export default function Homepage() {
  const { allImages, isLoading: isLoadingAllImages } = useAllImages();

  if (isLoadingAllImages) return <Spinner />;
  const categories = Array.from(
    new Set(allImages.map((image) => image.category))
  );
  const categoriesImages = {};
  for (const category of categories) {
    categoriesImages[category] = [];
  }
  for (const image of allImages) {
    if (categoriesImages[image.category].length < 2) {
      categoriesImages[image.category].push(image);
    }
  }

  return (
    <>
      <Hero />
      <HeroTitling />
      {isLoadingAllImages ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <PopularCategories
            categories={categories}
            categoriesImages={categoriesImages}
          />
          <NewArtWorks allImages={allImages} />
        </>
      )}

      <MeetTheArtist />
    </>
  );
}
