import styled from "styled-components";
import { useEffect } from "react";
import Logo from "./Logo";
import Hamburger from "./Hamberger";
import ListItem from "./ListItem";
import { AppNavProvider, useAppNav } from "../contexts/AppNavContext";
import CartButton from "../features/cart/CartButton";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";
import Cart from "../features/cart/Cart";
const StyledHeader = styled.header`
  display: flex;
  background-color: var(--color-brand-200);
  color: var(--color-grey-100);
  justify-content: space-between;
  align-items: center;
  position: relative;
  max-width: 100vw;
  padding: 0.75rem 1rem;
  font-size: var(--font-lg);
  border-bottom: 2px solid var(--color-brand-900);
  box-shadow: var(--shadow-lg);
  ${media(breakpoints.sm)} {
    padding: 1.375rem 1.765rem;
  }
`;
const StyledNav = styled.nav`
  display: flex;
  gap: 3rem;
  align-items: center;
`;
const StyledNavList = styled.ul`
  font-size: inherit;
  display: flex;
  gap: 1.5rem;
  height: 100vh;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  z-index: 10000;
  left: 0;
  top: 44px;
  background-color: var(--color-brand-200);
  width: calc(100vw - 100px);
  transition: 0.5s;
  padding-top: 3rem;
  padding-bottom: 3rem;
  box-shadow: var(--shadow-lg);
  /* transition: height 0.3s; */
  animation: change-height 0.2s linear;
  @keyframes change-height {
    from {
      height: 0;
    }
    to {
      height: 100vh;
    }
  }
  ${media(breakpoints.sm)} {
    justify-content: flex-end;
    flex-direction: row;
    gap: 3rem;
    position: relative;
    height: unset;
    top: 0;
    width: unset;
    box-shadow: none;
    padding-bottom: 0;
    padding-top: 0;
  }
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

function NavMenu() {
  const { collapsed, setCollapsed, cartIsOpen } = useAppNav();

  useEffect(
    function () {
      const handleDefaultVisibilityNav = () => {
        if (window.innerWidth <= 768) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      };
      handleDefaultVisibilityNav();
    },
    [setCollapsed]
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  return (
    <StyledNav>
      <CartButton />
      <Hamburger />
      {!collapsed && (
        <StyledNavList>
          {["Home", "Originals", "About", "Login"].map((item) => (
            <ListItem item={item} key={item} onSetCollapsed={setCollapsed}>
              {item}
            </ListItem>
          ))}
        </StyledNavList>
      )}
      {cartIsOpen && <Cart />}
    </StyledNav>
  );
}
