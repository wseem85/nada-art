import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      color: var(--color-grey-100);
      letter-spacing: 2px;
      text-transform: uppercase;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 500;
      color: var(--color-brand-500);
      letter-spacing: 2px;
      text-transform: uppercase;
    `}
${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.3rem;
      font-weight: 600;
      /* text-align: center; */
    `}
  line-height: 1.4;
`;

export default Heading;
