import styled from "styled-components";

import HeroOriginals from "../ui/HeroOriginals";
import PageContainer from "../ui/PageContainer";
import PictureBox from "../features/images/PictureBox";
import Filter from "../ui/Filter";
// import Spinner from "../ui/Spinner";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import Heading from "../ui/Heading";
import { MdOutlineFilterNone } from "react-icons/md";

import ButtonIcon from "../ui/ButtonIcon";
import Paragraph from "../ui/Paragraph";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import { useImages } from "../features/images/useImages";
// import { useAllImages } from "../features/images/useAllImages";
import { FiltersProvider } from "../contexts/FiltersContext";
// import { useQueryClient } from "@tanstack/react-query";
import withScrollToTop from "../ui/withScroolToTop";
import { useAllImages } from "../contexts/AllImagesContext";

// import { useSearchParams } from "react-router-dom";
export const PicturesContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  gap: 1rem;
  ${media("690px")} {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  ${media(breakpoints.md)} {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }

  ${media(breakpoints.lg)} {
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem;
  }
`;
const OperationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 1.5rem;

  /* justify-content: space-between; */
`;

function OriginalsComponent() {
  const [showFilter, setShowFilter] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allDimenitions, setAllDimenitions] = useState([]);
  const [minMaxPrice, setMinMaxPrice] = useState([]);
  const [filters, setFilters] = useState([]);
  // const queryClient = useQueryClient();
  const {
    images,
    isLoading: isLoadingImages,
    error: errorImages,
  } = useImages();
  // const { allImages, isLoading: isLoadingAllImages } = useAllImages();
  const { allImages } = useAllImages();
  // const allImages = queryClient.getQueryData(["allImages"]);
  console.log(allImages);
  function handleShowFilter() {
    setShowFilter((show) => !show);
  }
  useEffect(
    function () {
      function setValues() {
        const categories = Array.from(
          new Set(allImages?.map((image) => image.category))
        );
        const dimenisions = Array.from(
          new Set(allImages?.map((image) => image.dimenitions))
        );
        const sortedPrices = allImages
          ?.map((image) => image.price)
          .sort((a, b) => a - b);
        const minMax = [
          {
            min: sortedPrices.at(0),
            max: sortedPrices.slice(-1).pop(),
          },
        ];

        setAllCategories(categories);
        setAllDimenitions(dimenisions);
        setMinMaxPrice(minMax);
      }

      setValues();
    },
    [allImages]
  );
  useEffect(
    function () {
      setFilters([
        {
          filter: "Category",
          values: allCategories,
        },
        { filter: "Price", values: minMaxPrice },
        { filter: "Availability", values: ["in Store", "Sold out"] },
        {
          filter: "Size",
          values: allDimenitions,
        },
      ]);
    },
    [allCategories, allDimenitions, minMaxPrice]
  );
  if (isLoadingImages) return <Spinner />;
  return (
    <FiltersProvider>
      <HeroOriginals />

      <PageContainer>
        {showFilter && (
          <Filter filters={filters} setShowFilter={setShowFilter} />
        )}
        <Heading
          as="h3"
          style={{ textAlign: "center", marginBottom: "1.7rem" }}
        >
          Original Artworks
        </Heading>

        <OperationContainer>
          <ButtonIcon onClick={handleShowFilter}>
            <span>Filter</span> <MdOutlineFilterNone />
          </ButtonIcon>
          <p>{images?.length} Products</p>
        </OperationContainer>

        {errorImages && (
          <Error>Somthing went wrong {errorImages.message}</Error>
        )}
        {images?.length === 0 ? (
          <Paragraph>There are No Images matches Your Search </Paragraph>
        ) : (
          ""
        )}
        <div>
          {isLoadingImages && <Spinner />}
          {errorImages && <Error message={errorImages.message} />}
          {images?.length === 0 && (
            <p>There is no pictures matches your search</p>
          )}
        </div>
        <PicturesContainer>
          {images?.map((image) => (
            <PictureBox key={image.title} picture={image}></PictureBox>
          ))}
        </PicturesContainer>
      </PageContainer>
    </FiltersProvider>
  );
}
const Originals = withScrollToTop(OriginalsComponent);
export default Originals;
