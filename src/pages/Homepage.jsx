import { useAllImages as useAllImagesQuery } from "../features/images/useAllImages";
import { useAllImages as useAllImagesContext } from "../contexts/AllImagesContext";
import Hero from "../ui/Hero";
import HeroTitling from "../ui/HeroTitling";
import PageContentContainer from "../ui/PageContentContainer";
import NewArtWorks from "../ui/NewArtWorks";
import PopularCategories from "../ui/PopularCategories";
import Spinner from "../ui/Spinner";
import withScrollToTop from "../ui/withScroolToTop";
function HomepageComponent() {
  const { allImages: allImagesData, isLoading: isLoadingAllImages } =
    useAllImagesQuery();
  const { allImages, setAllImages } = useAllImagesContext();
  setAllImages(allImagesData);
  if (isLoadingAllImages) return <Spinner />;
  const categories = Array.from(
    new Set(allImages?.map((image) => image.category))
  );
  const categoriesImages = {};
  for (const category of categories) {
    categoriesImages[category] = [];
  }
  if (allImages?.length) {
    for (const image of allImages) {
      if (categoriesImages[image.category]?.length < 2) {
        categoriesImages[image.category].push(image);
      }
    }
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <Hero />
        <HeroTitling />
      </div>
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
        <PageContentContainer>
          <PopularCategories
            categories={categories}
            categoriesImages={categoriesImages}
          />
          <NewArtWorks allImages={allImages} />
        </PageContentContainer>
      )}
    </>
  );
}
const HomePage = withScrollToTop(HomepageComponent);
export default HomePage;
