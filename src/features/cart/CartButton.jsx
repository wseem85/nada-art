// import ButtonIcon from "../../ui/ButtonIcon";
import styled, { css } from "styled-components";

const HeaderCartButton = styled.button`
  background: none;
  position: relative;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999;
    width: 10px;
    height: 10px;
    background-color: var(--color-brand-900);
    border-radius: 50%;
  }
  ${(props) =>
    props.cartisopen &&
    css`
      &::before {
        display: none;
      }
    `}
  ${(props) =>
    props.cartisempty &&
    css`
      &::before {
        display: none;
      }
    `}
  &:focus {
    outline: none;
  }
  /* color: var(--color-grey-100); */
  & svg {
    width: 2.5rem;
    height: 2.5rem;

    color: var(--color-brand-700);
  }
  &:focus {
    border: none;
    outline: none;
  }
`;

import { FaCartArrowDown } from "react-icons/fa6";
import { useAppNav } from "../../contexts/AppNavContext";
// import { useEffect, useState } from "react";
import { useStoredCart } from "../../contexts/StoredCartContext";

export default function CartButton() {
  const { cartIsOpen, setCartIsOpen } = useAppNav();
  const { storedCart } = useStoredCart();
  // useEffect(function () {
  //   setStoredCart(JSON.parse(localStorage.getItem("cart")));
  // }, []);
  return (
    <HeaderCartButton
      cartisopen={cartIsOpen}
      cartisempty={storedCart.length === 0}
      onClick={() => setCartIsOpen((open) => !open)}
    >
      <FaCartArrowDown
        style={
          cartIsOpen
            ? { color: "var(--color-brand-700)" }
            : { color: "var(--color-grey-700)" }
        }
      />
    </HeaderCartButton>
  );
}
