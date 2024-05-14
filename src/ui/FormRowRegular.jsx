import styled from "styled-components";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";

const StyledFormRowRegular = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 2fr; */
  align-items: center;
  /* width: 100%; */
  width: 100%;
  /* grid-template-columns: 1fr 1fr; */

  row-gap: 0.5rem;
  font-size: 80%;
  padding: 0.5rem 0.7rem;
  & > input {
    min-width: 100%;
  }
  ${media(breakpoints.xs)} {
    font-size: 100%;
    grid-template-columns: 150px 2fr;
    column-gap: 1.3rem;
    row-gap: 3rem;
  }
  ${media(breakpoints.sm)} {
    grid-template-columns: 200px 500px;
  }
  ${media("850px")} {
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
  /* width: 100px; */
  /* width: 100%; */
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRowRegular>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRowRegular>
  );
}

export default FormRow;
