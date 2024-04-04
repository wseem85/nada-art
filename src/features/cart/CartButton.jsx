// import ButtonIcon from "../../ui/ButtonIcon";
import styled from "styled-components";

const HeaderCartButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  color: var(--color-grey-100);
  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-grey-100);
    &:hover {
      color: var(--color-brand-500);
    }
  }
  &:focus svg {
    color: var(--color-brand-500);
  }
`;
import { FaCartArrowDown } from "react-icons/fa6";
import { useAppNav } from "../../contexts/AppNavContext";
export default function CartButton() {
  const { setCartIsOpen } = useAppNav();
  return (
    <HeaderCartButton onClick={() => setCartIsOpen((open) => !open)}>
      <FaCartArrowDown />
    </HeaderCartButton>
  );
}
