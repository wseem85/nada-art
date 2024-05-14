import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
const ButtonIconText = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--color-brand-300);
  position: relative;
  padding: 0.6rem 0.8rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-brand-700);
  transition: all 0.3s;
  font-size: 80%;
  width: fit-content;
  ${media(breakpoints.xs)} {
    font-size: 100%;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-700);
    transition: 0.3s;
    ${media(breakpoints.xs)} {
      width: 3rem;
      height: 3rem;
    }
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
    color: var(--color-brand-700);
  }
  &:hover {
    border: 1px solid var(--color-grey-50);
    background-color: var(--color-brand-300);
    color: var(--color-grey-50);
    > span {
      color: var(--color-grey-50);
    }
    > svg {
      color: var(--color-grey-50);
    }
  }
  &:hover::after {
    display: block;
  }
`;

export default ButtonIconText;
