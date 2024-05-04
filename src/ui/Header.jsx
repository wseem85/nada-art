import { AppNavProvider } from "../contexts/AppNavContext";
import styled from "styled-components";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";

import Logo from "./Logo";
import NavMenu from "./NavMenu";
// import useUser from "../features/authentication/useUser";

const StyledHeader = styled.header`
  display: flex;
  background-color: var(--color-brown-0);
  color: var(--color-brand-700);
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  padding: 0.75rem 1rem;
  font-size: var(--font-lg);
  /* border-bottom: 2px solid var(--color-brand-900); */
  /* box-shadow: var(--shadow-md); */
  /* ${media(breakpoints.sm)} {
    padding: 1.375rem 1.765rem;
  } */
`;

export default function Header() {
  return (
    <AppNavProvider>
      <StyledHeader>
        <Logo />
        <NavMenu />
      </StyledHeader>
    </AppNavProvider>
  );
}
