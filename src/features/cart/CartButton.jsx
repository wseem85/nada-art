// import ButtonIcon from "../../ui/ButtonIcon";
import styled from "styled-components";

const HeaderCartButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-brand-100);
  }
  /* color: var(--color-grey-100); */
  & svg {
    width: 2.5rem;
    height: 2.5rem;

    color: var(--color-grey-100);
  }
  &:focus {
    border: none;
    outline: none;
  }
`;
import { FaCartArrowDown } from "react-icons/fa6";
import { useAppNav } from "../../contexts/AppNavContext";

export default function CartButton() {
  const { cartIsOpen, setCartIsOpen } = useAppNav();

  return (
    <HeaderCartButton onClick={() => setCartIsOpen((open) => !open)}>
      <FaCartArrowDown
        style={
          cartIsOpen
            ? { color: "var(--color-brand-500)" }
            : { color: "var(--color-grey-100)" }
        }
      />
    </HeaderCartButton>
  );
}
