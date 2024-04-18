import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  position: relative;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;
  &::after {
    position: absolute;
    transition: 0.3s;
    top: 0;
    right: -3rem;
    font-size: 1rem;
    font-weight: bold;
    color: var(--color-grey-100);
    content: "${(props) => props.content}";
    display: none;
  }

  &:hover {
    background-color: var(--color-brand-300);
    color: var(--color-grey-100);
    svg {
      color: var(--color-grey-100);
    }
  }
  &:hover::after {
    display: block;
  }

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-grey-100);
  }
`;

export default ButtonIcon;
