import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

const StyledParagraph = styled.p`
  line-height: 1.4;
  text-align: left;
  letter-spacing: var(--space-md);
  margin-bottom: 1.7rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  ${media(breakpoints.xs)} {
    text-align: center;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
  }
  color: var(--color-grey-500);
  &::first-letter {
    font-weight: bold;

    color: var(--color-brand-300);
  }
`;

export default function Paragraph({ color, children }) {
  return <StyledParagraph style={{ color: color }}>{children}</StyledParagraph>;
}
