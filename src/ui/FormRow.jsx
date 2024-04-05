import styled from "styled-components";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;

  gap: 2.4rem;

  padding: 1.2rem 0;
  ${media(breakpoints.sm)} {
    grid-template-columns: 120px 2fr;
  }
  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function FormRow({ label, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
    </StyledFormRow>
  );
}

export default FormRow;
