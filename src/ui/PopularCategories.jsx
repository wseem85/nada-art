// import { useEffect, useState } from "react";
// import styled from "styled-components";
import SectionHeading from "./SectionHeading";
import CategoriesOverview from "./CategoriesOverview";
import Category from "./Category";
// import Button from "./Button";
// import { media } from "../utils/helpers";
// import { breakpoints } from "../utils/variables";
// import { Section } from "./Section";
import styled from "styled-components";
import { useState } from "react";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
// import styled from "styled-components";

// const categories = [
//   { category: "Portrait", img: "images/portrait.webp" },
//   { category: "Fabric", img: "images/fabric.webp" },
//   { category: "Abstract", img: "images/abstract.webp" },
//   { category: "Charcoal", img: "images/charcoal.webp" },
//   { category: "oilpainting", img: "images/fabric.webp" },
//   { category: "Datin", img: "images/abstract.webp" },
//   { category: "Explore All Categories" },
// ];
const TabbedComponent = styled.ul`
  display: flex;
  background-color: var(--color-grey-100);
  justify-content: space-between;
  /* gap: 0.3rem; */
  max-width: 100vw;
  margin-bottom: 1.3rem;
  width: 100%;
  & > li {
    border-bottom: 1px solid var(--color-grey-300);
  }
  & > li:not(:last-child) {
    border-right: 1px solid var(--color-grey-300);
  }
`;
const Tab = styled.li`
  width: 25%;
  text-transform: uppercase;
  padding: 0.3rem 0.5rem;
  /* background-color: var(--color-grey-50); */
  font-size: 65%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  ${media("350px")} {
    font-size: 75%;
    letter-spacing: 1.2px;
  }
  ${media(breakpoints.xs)} {
    font-size: 85%;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  ${media(breakpoints.sm)} {
    font-size: 100%;
    padding-top: 1.3rem;
    padding-bottom: 1.3rem;
    letter-spacing: 1.5px;
  }
  cursor: pointer;
  text-align: center;
  /* letter-spacing: 1.2px; */
`;
const StyledTabbedComponenetContainer = styled.div`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-50);
`;
export default function PopularCategories({ categories, categoriesImages }) {
  const [activeCategory, setActiveCategory] = useState("Portrait");
  return (
    <>
      <SectionHeading>Popular Categories</SectionHeading>
      <StyledTabbedComponenetContainer>
        <TabbedComponent>
          {categories.map((category) => (
            <Tab
              style={
                category === activeCategory
                  ? {
                      borderBottom: "none",
                      color: "var(--color-brand-500)",
                      backgroundColor: "var(--color-grey-50)",
                      fontWeight: "bold",
                    }
                  : {}
              }
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Tab>
          ))}
        </TabbedComponent>
        <CategoriesOverview>
          {
            <Category
              category={activeCategory}
              images={categoriesImages[activeCategory]}
            />
          }
        </CategoriesOverview>
      </StyledTabbedComponenetContainer>
    </>
  );
}
