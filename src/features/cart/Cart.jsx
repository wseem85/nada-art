import styled from "styled-components";

const StyledCart = styled.div`
  font-size: inherit;

  position: absolute;
  z-index: 10000;
  right: 0;
  top: 44px;
  background-color: var(--color-brand-200);
  width: calc(50vw);
  transition: 0.5s;
  padding-top: 3rem;
  padding-bottom: 3rem;
  box-shadow: var(--shadow-lg);
  /* transition: height 0.3s; */
`;

export default function Cart() {
  return <StyledCart> Your Cart Is empty</StyledCart>;
}
