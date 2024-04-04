import styled from "styled-components";

const StyledLogo = styled.h3`
  font-size: var(--font-lg);
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
`;
export default function Logo() {
  return <StyledLogo>Nada Art</StyledLogo>;
}
