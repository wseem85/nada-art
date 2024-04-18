import { useEffect } from "react";
import { useAppNav } from "../contexts/AppNavContext";
import CartButton from "../features/cart/CartButton";
import Cart from "../features/cart/Cart";
import Hamburger from "./Hamberger";
import ListItem from "./ListItem";
import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
// import useUser from "../features/authentication/useUser";
import UserInfo from "../features/users/UserInfo";
import SpinnerMini from "./SpinnerMini";
import Login from "../features/authentication/Login";
import useUser from "../features/authentication/useUser";
import { useCurrentUser } from "../contexts/CurrentUserProvider";

const StyledNav = styled.nav`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

const StyledNavList = styled.ul`
  font-size: inherit;
  display: flex;
  gap: 3rem;
  height: 0;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  z-index: 999;
  right: 0;

  top: 44px;
  background-color: var(--color-brand-200);
  width: 100vw;
  transition: 0.5s;
  padding-top: 3rem;
  padding-bottom: 3rem;
  box-shadow: var(--shadow-lg);
  /* transition: height 0.3s; */
  animation: change-height 0.2s linear forwards;
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
    /* gap:s 3rem; */
    position: relative;
    width: unset;
    height: unset;
    top: 0;
    box-shadow: none;
    padding-bottom: 0;
    padding-top: 0;
    animation: none;
  }
`;
export default function NavMenu() {
  const { collapsed, setCollapsed, cartIsOpen } = useAppNav();
  const { user, isAuthenticated, isLoading: isLoadingUser } = useUser();
  const { currentUser, setCurrentUser } = useCurrentUser();

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
  useEffect(
    function () {
      setCurrentUser(user);
    },
    [user, setCurrentUser]
  );
  return (
    <StyledNav>
      <CartButton />
      {isLoadingUser && <SpinnerMini />}
      {currentUser && isAuthenticated ? <UserInfo user={user} /> : <Login />}
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
