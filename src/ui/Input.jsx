import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.3rem 0.6rem;
  box-shadow: var(--shadow-sm);
  max-width: 8rem;

  ${media("250px")} {
    max-width: 12rem;
  }
  ${media("350px")} {
    max-width: unset;
  }
  ${media(breakpoints.xs)} {
    padding: 0.7rem 1.3rem;
  }
`;

export default Input;
