import { useEffect } from "react";
import { useAppNav } from "../contexts/AppNavContext";
import CartButton from "../features/cart/CartButton";
import styled from "styled-components";
// import Cart from "../features/cart/Cart";
import Hamburger from "./Hamberger";
import NavList from "./NavList";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
// import useUser from "../features/authentication/useUser";
// import UserInfo from "../features/users/UserInfo";
// import SpinnerMini from "./SpinnerMini";
// import Login from "../features/authentication/Login";
// import useUser from "../features/authentication/useUser";
// import { useCurrentUser } from "../contexts/CurrentUserProvider";

const StyledNav = styled.nav`
  display: flex;

  gap: 1rem;
  align-items: center;
  ${media(breakpoints.sm)} {
    gap: 1.3rem;
  }
`;

export default function NavMenu() {
  // cartIsOpen
  const { collapsed, setCollapsed } = useAppNav();
  // const { user, isAuthenticated, isLoading: isLoadingUser } = useUser();
  // const { currentUser, setCurrentUser } = useCurrentUser();
  // const ref = useRef();
  // console.log(ref);
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
  // useEffect(
  //   function () {
  //     setCurrentUser(user);
  //   },
  //   [user, setCurrentUser]
  // );
  return (
    <StyledNav>
      <CartButton style={{ lineHeight: "2.5rem" }} />
      {/* {isLoadingUser && <SpinnerMini />}
      {currentUser && isAuthenticated ? <UserInfo user={user} /> : <Login />} */}
      <Hamburger />
      {!collapsed && <NavList />}
      {/* {cartIsOpen && <Cart />} */}
    </StyledNav>
  );
}
