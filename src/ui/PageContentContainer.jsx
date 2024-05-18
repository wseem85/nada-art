import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

const PageContentContainer = styled.div`
  /* margin: rem 0rem; */
  padding: 0.7rem 1rem;
  ${media("350px")} {
    padding: 1rem 1.3rem;
  }
  ${media(breakpoints.xs)} {
    padding: 1.7rem 2.3rem;
  }
  ${media(breakpoints.sm)} {
    padding: 3rem 2.5rem;
  }
  background-color: var(--color-grey-100);
`;

export default PageContentContainer;
