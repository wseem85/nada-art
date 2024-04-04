import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

const StyledNavigationMenu = styled.ul`
  font-size: inherit;
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  flex-direction: column;
  position: absolute;
  z-index: 10000;
  right: 0;
  top: 44px;
  background-color: var(--color-brand-200);
  width: 100vw;
  transition: 0.5s;
  padding-bottom: 3rem;
  box-shadow: var(--shadow-lg);
  ${media(breakpoints.sm)} {
    flex-direction: row;
    position: relative;
    top: 0;
    width: unset;
    box-shadow: none;
    padding-bottom: 0;
  }
`;
export default function NavigationMenu({ children }) {
  return <StyledNavigationMenu>{children}</StyledNavigationMenu>;
}
