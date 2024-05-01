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
  z-index: 88;
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
  transform: translateX(-100%);
  animation: move-in 0.2s linear forwards;
  @keyframes move-in {
    to {
      transform: translateX(0);
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
  // const ref = useRef();

  return (
    <StyledCart>
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
