import styled, { css } from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
// import { breakpoints } from "../utils/variables";

const Form = styled.form`
  font-size: 80%;
  ${media("350px")} {
    font-size: 90%;
  }
  ${media(breakpoints.xs)} {
    font-size: 100%;
  }
  & * {
    font-size: inherit;
  }
  max-width: 100vw;
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2rem 1.3rem;
      display: grid;
      place-items: center;
      gap: 2rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      & label {
        width: 100%;
      }
      ${media(breakpoints.sm)} {
        padding: 4rem 3rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      /* display: grid; */
      /* flex-direction: column; */
      /* align-items: center; */
      /* justify-content: center; */
      /* display: grid; */
      ${media(breakpoints.sm)} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        /* grid-template-columns: 1fr 1fr; */
        column-gap: 3rem;
      }
    `} /* overflow: hidden; */
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
