import styled from "styled-components";
import Button from "./Button";

export const FormButton = styled(Button)`
  &:disabled {
    background-color: var(--color-brand-100);
    opacity: 0.7;
  }
`;
