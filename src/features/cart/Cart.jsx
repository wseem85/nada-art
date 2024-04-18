import { useEffect, useRef } from "react";
import styled from "styled-components";
import { media } from "../../utils/helpers";
import { breakpoints } from "../../utils/variables";
import { useAppNav } from "../../contexts/AppNavContext";
import Heading from "../../ui/Heading";
import ButtonIcon from "../../ui/ButtonIcon";

const StyledCart = styled.div`
  font-size: inherit;

  position: absolute;
  z-index: 10000;
  right: 0;
  top: 54px;
  min-height: 20rem;
  background-color: var(--color-brand-200);
  width: 100vw;
  transition: 0.5s;
  padding: 0.2rem 3rem 1.5rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  animation: change-height 0.2s linear forwards;
  @keyframes change-height {
    from {
      height: 0;
    }
    to {
      height: 20vh;
    }
  }
  ${media(breakpoints.sm)} {
    top: 66.5px;
  }
  /* transition: height 0.3s; */
`;

export default function Cart() {
  const { setCartIsOpen } = useAppNav();
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        // e.stopPropagation();
        console.log("click");
        console.log(ref.current);
        if (ref.current && !ref.current.contains(e.target))
          setCartIsOpen(false);
      }
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick);
    },
    [setCartIsOpen]
  );
  return (
    <StyledCart ref={ref}>
      <Heading as="h3">Your Cart Is Empty</Heading>
      <ButtonIcon
        onClick={() => setCartIsOpen(false)}
        style={{
          padding: "0.3rem",
          fontSize: "2rem",
          fontWeight: "bold",
          display: "block",
        }}
      >
        x
      </ButtonIcon>
    </StyledCart>
  );
}
