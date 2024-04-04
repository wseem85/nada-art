import styled from "styled-components";

const StyledParagraph = styled.p`
  line-height: var(--line-md);
  color: var(--color-grey-500);
  letter-spacing: var(--space-md);
  margin-bottom: 1.7rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
`;

export default function Paragraph({ children }) {
  return <StyledParagraph>{children}</StyledParagraph>;
}
