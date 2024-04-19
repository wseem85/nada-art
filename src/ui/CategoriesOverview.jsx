import styled from "styled-components";

// import { media } from "../utils/helpers";
// import { breakpoints } from "../utils/variables";

const StyledCategoryOverview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function CategoriesOverview({ children }) {
  return <StyledCategoryOverview>{children}</StyledCategoryOverview>;
}
