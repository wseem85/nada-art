import styled from "styled-components";

import HeroOriginals from "../ui/HeroOriginals";
import PageContentContainer from "../ui/PageContentContainer";

import Filter from "../ui/Filter";
import Spinner from "../ui/Spinner";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import Heading from "../ui/Heading";
import { MdOutlineFilterNone } from "react-icons/md";

import ButtonIcon from "../ui/ButtonIcon";
// import Paragraph from "../ui/Paragraph";
import { useEffect, useState } from "react";
// import Spinner from "../ui/Spinner";
// import Error from "../ui/Error";
import { useImages } from "../features/images/useImages";
// import { useAllImages } from "../features/images/useAllImages";
import { FiltersProvider } from "../contexts/FiltersContext";
// import { useQueryClient } from "@tanstack/react-query";
import withScrollToTop from "../ui/withScroolToTop";
import { useAllImages } from "../contexts/AllImagesContext";
import FilteredOriginals from "./FilteredOriginals";

// import { useSearchParams } from "react-router-dom";

const OperationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 1.5rem;

  /* justify-content: space-between; */
`;
const EditedPageContentContainer = styled(PageContentContainer)`
  padding: 1rem 0.6rem;
  ${media(breakpoints.xs)} {
    padding: 2rem 1rem;
  }
  ${media(breakpoints.sm)} {
    padding: 3rem 2.3rem;
  }
`;
function OriginalsComponent() {
  const [showFilter, setShowFilter] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allDimenitions, setAllDimenitions] = useState([]);
  const [minMaxPrice, setMinMaxPrice] = useState([]);
  const [filters, setFilters] = useState([]);
  // const queryClient = useQueryClient();

  // const { allImages, isLoading: isLoadingAllImages } = useAllImages();
  const { allImages } = useAllImages();
  // const allImages = queryClient.getQueryData(["allImages"]);
  const {
    images,
    isLoading: isLoadingImages,
    error: errorImages,
  } = useImages();
  useEffect(
    function () {
      window.scrollTo(0, 700);
    },
    [images]
  );

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

      <EditedPageContentContainer>
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
        </OperationContainer>
        <FilteredOriginals
          images={images}
          isLoadingImages={isLoadingImages}
          errorImages={errorImages}
        />
      </EditedPageContentContainer>
    </FiltersProvider>
  );
}
const Originals = withScrollToTop(OriginalsComponent);
export default Originals;
