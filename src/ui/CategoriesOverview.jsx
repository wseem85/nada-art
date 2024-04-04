import styled from "styled-components";

import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

const StyledScrollableRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  flex-wrap: nowrap;
  ${media(breakpoints.md)} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-content: center;
    gap: 3rem;
  }
  /* position: relative; */
`;

export default function CategoriesOverview({ children, style }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <StyledScrollableRow style={style}>{children}</StyledScrollableRow>
    </div>
  );
}
