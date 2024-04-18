import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";

const StyledNavLink = styled(NavLink)`
  display: block;
  position: relative;
  width: 100%;
  font-size: var(--font-md);
  height: 100%;
  font-weight: 600;
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid var(--color-brand-500);
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
    width: 6rem;
  }
  &.active {
    color: var(--color-brand-900);
  }
  ${media(breakpoints.sm)} {
    font-size: var(--font-md);
    border-bottom: none;
    padding-bottom: 0rem;
  }
`;
const AfterSpan = styled.span``;
export default function ListItem({ children, item, onSetCollapsed }) {
  const [screenWidth, setScreenWidth] = useState(null);
  useEffect(function () {
    setScreenWidth(window.innerWidth);
  }, []);
  return (
    <li>
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
    </li>
  );
}
