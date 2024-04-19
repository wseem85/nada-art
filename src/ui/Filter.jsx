import { formatCurrency, media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
// import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  MdOutlineClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import ButtonIcon from "./ButtonIcon";
import Heading from "./Heading";
import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import { useFilters } from "../contexts/FiltersContext";
import { useSearchParams } from "react-router-dom";

// import { useImagesContext } from "../contexts/ImagesContext";
// import { useImages } from "../features/images/useImages";

const StyledFilter = styled.div`
  /* border: 1px solid var(--color-grey-100); */
  background-color: var(--color-grey-0);
  /* box-shadow: var(--shadow-sm); */
  /* border-radius: var(--border-radius-sm); */
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  /* margin-bottom: 2rem; */
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  width: 90vw;

  height: 100%;
  ${media(breakpoints.sm)} {
    width: 50vw;
  }
  ${media(breakpoints.md)} {
    width: 25vw;
  }
`;
const FilterHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledFilterListItem = styled.li`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
const StyledFilterButton = styled.div`
  position: relative;
  background-color: var(--color-grey-0);
  border: none;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    background-color: transparent;
    border: 1px solid var(--color-brand-300);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0.9rem;
    height: 0.9rem;
    background-color: var(--color-brand-300);
    /* border: 1px solid var(--color-brand-300); */
    display: none;
    ${(props) =>
      props.ischecked === true &&
      css`
        display: block;
      `}
  }

  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 1.44rem;
  transition: all 0.3s;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;
const FilterBody = styled.div`
  display: flex;
  flex-direction: column;
`;

// const { categories } = getCategories();
// const { maxPrice, minPrice } = getMinMaxPrice();
// const { filteredDimenisions: dims } = getDimenisitions();

// const dimsValues = [];
// for (const value of dims)
//   dimsValues.push({
//     width: Number(value.slice(0, 2)),
//     height: Number(value.slice(3)),
//   });
// const filters = [
//   {
//     filter: "Category",
//     values: categories,
//   },
//   { filter: "Price", values: [{ min: minPrice, max: maxPrice }] },
//   { filter: "Availability", values: ["in Store", "Sold out"] },
//   {
//     filter: "Size",
//     values: dimsValues,
//   },
// ];
function Filter({ filters, setShowFilter }) {
  function handleCloseFilter() {
    setShowFilter(false);
  }

  return (
    <Overlay>
      <StyledFilter>
        <FilterHeader>
          <Heading as="h3">Filter</Heading>
          <ButtonIcon onClick={handleCloseFilter}>
            <MdOutlineClose />
          </ButtonIcon>
        </FilterHeader>

        <ListItemsContainer
          filters={filters}
          setShowFilter={setShowFilter}
        ></ListItemsContainer>
      </StyledFilter>
    </Overlay>
  );
}

export default Filter;
//
function FilterListItem({ filter }) {
  const [opened, setOpened] = useState(false);
  function handleClickArrowBtn() {
    setOpened((opened) => !opened);
  }
  return (
    <StyledFilterListItem>
      <FilterHeader onClick={handleClickArrowBtn}>
        <Heading as="h4">{filter.filter}</Heading>
        <ButtonIcon>
          {opened ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </ButtonIcon>
      </FilterHeader>

      {opened && (
        <FilterBody>
          {filter.values.map((entry) => (
            <FilterButton
              filter={filter.filter}
              entry={entry}
              key={entry}
            ></FilterButton>
          ))}
        </FilterBody>
      )}
    </StyledFilterListItem>
  );
}

function ListItemsContainer({ filters, setShowFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, availabilities, sizes, maxPrice } = useFilters();

  const encodedCategories = categories.map((value) =>
    encodeURIComponent(value)
  );
  const encodedAvailabilities = availabilities
    .map((el) => el.replace(" ", ""))
    .map((value) => encodeURIComponent(value));
  const encodedSizes = sizes.map((el) => encodeURIComponent(el));

  function handleSearch() {
    if (categories.length)
      searchParams.set("categories", encodedCategories.join(","));
    else searchParams.delete("categories");
    if (availabilities.length)
      searchParams.set("availabilities", encodedAvailabilities.join(","));
    else searchParams.delete("availabilities");
    if (sizes.length) searchParams.set("sizes", encodedSizes.join(","));
    else searchParams.delete("sizes");

    if (maxPrice) searchParams.set("maxPrice", maxPrice);
    else searchParams.delete("maxPrice");
    setSearchParams(searchParams);
    setShowFilter(false);
    // if (filter === "Size") {
    //   searchParams.set(`${filter}-width`, entry.width);
    //   searchParams.set(`${filter}-height`, entry.height);
    // } else searchParams.set(`${filter}`, entry);
    // setSearchParams(searchParams);
  }
  return (
    <>
      <ul>
        {filters.map((filter) => (
          <FilterListItem filter={filter} key={filter.filter}></FilterListItem>
        ))}
      </ul>
      <Button onClick={handleSearch}>See Results</Button>
    </>
  );
}

function FilterButton({ filter, entry }) {
  const { categories, availabilities, sizes, dispatch } = useFilters();
  console.log(filter, entry);
  const isChoosen =
    categories.includes(entry) ||
    availabilities.includes(entry) ||
    sizes.includes(entry);
  function handleClickFilterButton() {
    // if (filter === "Size") {
    //   searchParams.set(`${filter}-width`, entry.width);
    //   searchParams.set(`${filter}-height`, entry.height);
    // } else searchParams.set(`${filter}`, entry);

    // setSearchParams(searchParams);

    if (filter === "Size")
      dispatch({
        type: "filters/editSize",
        payload: entry,
      });
    else if (filter === "Category")
      dispatch({
        type: "filters/editCategory",
        payload: entry,
      });
    else if (filter === "Availability")
      dispatch({
        type: "filters/editAvailability",
        payload: entry,
      });

    // setIsChecked((checked) => !checked);
  }

  if (filter === "Price") return <RangeInputWithLabel entry={entry} />;
  return (
    <StyledFilterButton
      key={entry}
      onClick={handleClickFilterButton}
      ischecked={isChoosen}
    >
      {entry.width ? `${entry.width}x${entry.height}` : entry}
    </StyledFilterButton>
  );
}
const StyledRange = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 80%;
  height: 1rem;
  background: var(--color-grey-200);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: var(--color-brand-300);
    border-radius: 50%;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  /* Firefox */
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: var(--color-brand-300);
    border-radius: 50%;
    cursor: pointer;
  }
`;
function RangeInputWithLabel({ entry }) {
  console.log(entry);
  // const [searchParams, setSearchParams] = useSearchParams();
  const { maxPrice, dispatch } = useFilters();
  const [currentValue, setCurrentValue] = useState(maxPrice);
  useEffect(
    function () {
      dispatch({ type: "filters/editMaxPrice", payload: currentValue });
    },
    [currentValue, dispatch]
  );
  const handleRangeChange = (event) => {
    setCurrentValue(parseInt(event.target.value));
    // searchParams.set(`${filter}`, currentValue);
    // setSearchParams(searchParams);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="rangeInput">
        Choose Max Price : <span> {formatCurrency(currentValue)}</span>
      </label>
      <StyledRange
        type="range"
        id="rangeInput"
        step={100}
        min={entry.min}
        max={entry.max}
        defaultValue={4000}
        value={currentValue}
        onChange={handleRangeChange}
      />
    </div>
  );
}
