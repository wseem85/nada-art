// import { MdOutlineLogin } from "react-icons/md";
// import { MdOutlineLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";
// import ButtonIconText from "./ButtonIconText";
import useLogout from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
// import { useAppNav } from "../contexts/AppNavContext";
const StyledNavLink = styled(NavLink)`
  display: block;
  position: relative;
  width: 100%;
  font-size: var(--font-md);
  height: 100%;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.7px;
  padding: 0.5rem;
  padding-left: 1.3rem;
  border-top: 1px solid var(--color-brand-midTransparency);
  padding-top: 2rem;
  text-align: left;
  /* border-bottom: 1px solid var(--color-brand-500); */
  padding-bottom: 0.6rem;
  /* padding-left: 3rem; */
  /* &::after {
    width: 0;
    height: 3px;
    position: absolute;
    bottom: 0;
    background-color: var(--color-brand-500);
  }
  
  */

  &:hover .span-after {
    width: 6.5rem;
  }
  &.active {
    color: var(--color-brand-900);
    font-weight: 700;
  }
  ${media(breakpoints.sm)} {
    letter-spacing: 1.3px;
    font-size: var(--font-md);
    padding: 0.5rem;
    padding-bottom: 0rem;
    border-top: none;
  }
  ${media(breakpoints.pmd)} {
    letter-spacing: 1.7px;
  }
`;
const AfterSpan = styled.span``;
export default function ListItem({ children, item, onSetCollapsed }) {
  const [screenWidth, setScreenWidth] = useState(null);

  const { logout, isLoading } = useLogout();
  // const { setCurrentUser } = useCurrentUser();
  function handleLogout(e) {
    e.preventDefault();

    logout();

    // setCurrentUser(null);
  }
  useEffect(function () {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <li>
      {item !== "Logout" && (
        <StyledNavLink
          onClick={() =>
            onSetCollapsed((collapsed) => {
              if (screenWidth < 768) return !collapsed;
            })
          }
          to={item.toLowerCase()}
        >
          {children}
          <AfterSpan className={`${screenWidth < 768 ? "" : "span-after"}`} />
        </StyledNavLink>
      )}
      {item === "Logout" && isLoading && (
        <StyledNavLink style={{ minWidth: "82px" }}>
          <SpinnerMini />
        </StyledNavLink>
      )}
      {item === "Logout" && !isLoading && (
        <StyledNavLink
          onClick={handleLogout}
          style={{
            fontWeight: "normal",
            minWidth: "82px",
          }}
        >
          Logout
        </StyledNavLink>
      )}
    </li>
  );
}
