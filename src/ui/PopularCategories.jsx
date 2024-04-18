import { useEffect, useState } from "react";
import styled from "styled-components";
import SectionHeading from "./SectionHeading";
import CategoriesOverview from "./CategoriesOverview";
import CategoryBox from "./CategoryBox";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import { Section } from "./Section";
// import { useImages } from "../features/images/useImages";
const StyledDiv = styled.div`
  position: absolute;
  top: 60%;
  left: 0;
  width: 100vw;
  z-index: 999;
  transform: translateY(-50%);
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media(breakpoints.md)} {
    display: none;
  }
`;
const StyledArrowBtn = styled.button`
  width: 50px;
  height: 50px;
  /* line-height: 50px; */
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--color-brand-200);
  color: var(--color-grey-100);
  border: none;
  outline: none;
  border-radius: 50%;
  font-size: var(--font-xl);
  font-weight: bold;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;
const categories = [
  { category: "Portrait", img: "images/portrait.webp" },
  { category: "Fabric", img: "images/fabric.webp" },
  { category: "Abstract", img: "images/abstract.webp" },
  { category: "Charcoal", img: "images/charcoal.webp" },
  { category: "oilpainting", img: "images/fabric.webp" },
  { category: "Datin", img: "images/abstract.webp" },
  { category: "Explore All Categories" },
];
export default function PopularCategories() {
  const [transformAmount, setTransformAmount] = useState(0);
  function handleScrollRight() {
    if (transformAmount < 0)
      setTransformAmount((transformAmount) => transformAmount + 200);
  }
  function handleScrollLeft() {
    if (transformAmount <= 0 && transformAmount > -(categories.length * 200))
      setTransformAmount((transformAmount) => transformAmount - 200);
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setTransformAmount(0);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const style = { transform: `translateX(${transformAmount}px)` };
  return (
    <Section>
      <SectionHeading>Popular Categories</SectionHeading>

      <CategoriesOverview style={style}>
        {categories.map((category) => (
          <CategoryBox category={category} key={category.category} />
        ))}
      </CategoriesOverview>

      <StyledDiv>
        <StyledArrowBtn onClick={handleScrollRight}>
          <span style={{ display: "block", marginBottom: "10px" }}>&larr;</span>
        </StyledArrowBtn>
        <StyledArrowBtn onClick={handleScrollLeft}>
          <span style={{ display: "block", marginBottom: "10px" }}>&rarr;</span>
        </StyledArrowBtn>
      </StyledDiv>
    </Section>
  );
}
