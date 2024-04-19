// import { useEffect, useState } from "react";
// import styled from "styled-components";
import SectionHeading from "./SectionHeading";
import CategoriesOverview from "./CategoriesOverview";
import Category from "./Category";
// import Button from "./Button";
// import { media } from "../utils/helpers";
// import { breakpoints } from "../utils/variables";
import { Section } from "./Section";
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
export default function PopularCategories({ categories, categoriesImages }) {
  return (
    <Section>
      <SectionHeading>Popular Categories</SectionHeading>

      <CategoriesOverview>
        {categories.map((category) => (
          <Category
            category={category}
            key={category}
            images={categoriesImages[category]}
          />
        ))}
      </CategoriesOverview>
    </Section>
  );
}
