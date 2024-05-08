import ListItem from "./ListItem";
import styled from "styled-components";
import { useAppNav } from "../contexts/AppNavContext";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import useOutSideClick from "../hooks/useOutsideClick";
const StyledNavList = styled.ul`
  font-size: inherit;
  display: flex;
  gap: 1.3rem;
  /* height: 0; */
  justify-content: flex-start;
  flex-direction: column;
  position: fixed;
  z-index: 999;
  right: 0;
  top: 59px;
  background-color: var(--color-brown-0);
  width: 80vw;
  /* transition: 0.5s; */
  transform: translateX(100%);
  padding-top: 4rem;
  padding-bottom: 3rem;
  /* box-shadow: var(--shadow-lg); */
  transition: all 0.3s;
  animation: move-in 0.2s linear forwards;
  @keyframes move-in {
    to {
      transform: translate(0);
    }
  }
  ${media(breakpoints.sm)} {
    justify-content: flex-end;
    flex-direction: row;
    gap: 1.8rem;
    transform: translateX(0);
    position: relative;
    width: unset;
    /* height: unset; */
    top: 0;
    box-shadow: none;
    padding-bottom: 0;
    padding-top: 0;
    animation: none;
  }
`;
export default function NavList() {
  const { setCollapsed } = useAppNav();
  const ref = useOutSideClick(function () {
    if (window.innerWidth <= 768) setCollapsed(true);
  });
  return (
    <StyledNavList ref={ref}>
      {["Home", "Originals", "About", "Account", "Search"].map((item) => (
        <ListItem item={item} key={item} onSetCollapsed={setCollapsed}>
          {item}
        </ListItem>
      ))}
    </StyledNavList>
  );
}
