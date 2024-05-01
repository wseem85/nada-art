import { useEffect, useRef } from "react";
import styled from "styled-components";
import { media } from "../../utils/helpers";
import { breakpoints } from "../../utils/variables";
import { useAppNav } from "../../contexts/AppNavContext";
import Heading from "../../ui/Heading";
import ButtonIcon from "../../ui/ButtonIcon";
const StyledCart = styled.div`
  font-size: inherit;
  padding-top: 1.3rem;
  position: absolute;
  z-index: 10000;
  right: 0;
  top: 50px;
  min-height: 20rem;
  background-color: var(--color-brown-0);
  width: 100vw;
  transition: 0.5s;
  padding-bottom: 3rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
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
    top: 58.5px;
  }
  /* transition: height 0.3s; */
`;

const StyledCartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <StyledCartHeader>
        <Heading as="h3">Your Cart Is Empty</Heading>
        <ButtonIcon
          onClick={() => setCartIsOpen(false)}
          style={{
            backgroundColor: "transparent",
            fontSize: "2rem",
          }}
        >
          x
        </ButtonIcon>
      </StyledCartHeader>
    </StyledCart>
  );
}
