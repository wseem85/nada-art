import styled from "styled-components";

const StyledParagraph = styled.p`
  line-height: var(--line-md);

  letter-spacing: var(--space-md);
  margin-bottom: 1.7rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  color: var(--color-grey-500);
`;

export default function Paragraph({ color, children }) {
  return <StyledParagraph style={{ color: color }}>{children}</StyledParagraph>;
}
