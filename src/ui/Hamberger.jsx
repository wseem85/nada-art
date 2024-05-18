import styled from "styled-components";
import { useAppNav } from "../contexts/AppNavContext";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";
const HamburgerButton = styled.button`
  display: flex;
  background-color: transparent;
  width: 2.3rem;
  height: 2.3rem;
  flex-direction: column;
  /* gap: 0.2rem; */
  justify-content: space-between;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
  ${media(breakpoints.sm)} {
    display: none;
  }
`;
const DashSpan = styled.span`
  width: 100%;
  height: 3px;
  background-color: var(--color-brand-700);
  position: relative;
  ${(props) =>
    props.$collapsed === false &&
    props.childno === 1 &&
    `
      transform: translate(3px,8px)rotate(45deg);
      top:2px;
    `}
  ${(props) =>
    props.$collapsed === false &&
    props.childno === 3 &&
    `
      transform: translate(2px,-10px) rotate(-45deg) ;
    
    `}
  ${(props) =>
    props.$collapsed === false &&
    props.childno === 2 &&
    `
      display:none
    `}
`;
export default function Hamburger() {
  const { collapsed, setCollapsed } = useAppNav();
  return (
    <HamburgerButton onClick={() => setCollapsed((collapsed) => !collapsed)}>
      <DashSpan $collapsed={collapsed} childno={1}></DashSpan>
      <DashSpan $collapsed={collapsed} childno={2}></DashSpan>
      <DashSpan $collapsed={collapsed} childno={3}></DashSpan>
    </HamburgerButton>
  );
}
