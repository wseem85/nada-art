// import { useEffect, useState } from "react";
// import styled from "styled-components";
import SectionHeading from "./SectionHeading";
import CategoriesOverview from "./CategoriesOverview";
import Category from "./Category";
// import Button from "./Button";
// import { media } from "../utils/helpers";
// import { breakpoints } from "../utils/variables";
import { Section } from "./Section";
import styled from "styled-components";
import { useState } from "react";
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
  justify-content: center;
  gap: 0.3rem;
  max-width: 100vw;
  margin-bottom: 1.3rem;
`;
const Tab = styled.li`
  text-transform: uppercase;
  padding: 0.3rem 0.5rem;
  font-size: 70%;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-300);
  cursor: pointer;
  /* letter-spacing: 1.2px; */
`;
export default function PopularCategories({ categories, categoriesImages }) {
  const [activeCategory, setActiveCategory] = useState("Portrait");
  return (
    <Section>
      <SectionHeading>Popular Categories</SectionHeading>
      <TabbedComponent>
        {categories.map((category) => (
          <Tab key={category} onClick={() => setActiveCategory(category)}>
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
    </Section>
  );
}
