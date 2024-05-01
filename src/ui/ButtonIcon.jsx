import styled from "styled-components";

const ButtonIcon = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  background: none;
  border: none;
  position: relative;
  padding: 0.6rem 0.8rem;
  border: 1px solid transparent;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;
  color: var(--color-brand-300);
  background-color: var(--color-grey-50);
  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-700);
    transition: 0.2s;
  }
  &::after {
    position: absolute;
    transition: 0.3s;
    top: 0;
    right: -3rem;
    font-size: 1rem;
    font-weight: bold;
    color: var(--color-brand-700);
    content: "${(props) => props.content}";
    display: none;
  }
  & > span {
    font-weight: bold;
  }
  &:hover {
    border: 1px solid var(--color-brand-700);
    background-color: var(--color-grey-0);
    color: var(--color-brand-500);
    svg {
      color: var(--color-brand-700);
    }
  }
  &:hover::after {
    display: block;
  }
`;

export default ButtonIcon;
