import styled from "styled-components";
import { breakpoints } from "../utils/variables";
import { media } from "../utils/helpers";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  /* width: 100%; */
  max-width: 100%;
  /* grid-template-columns: 1fr 1fr; */

  column-gap: 0.8rem;
  row-gap: 1.2rem;
  font-size: 80%;
  padding: 0.5rem 0.7rem;

  grid-template-columns: minmax(50px, 120px) 2fr;
  ${media(breakpoints.xs)} {
    font-size: 100%;
    grid-template-columns: minmax(50px, 100px) 70%;
  }
  ${media(breakpoints.sm)} {
    grid-template-columns: minmax(50px, 90px) minmax(50px, 250px);
  }
  ${media("850px")} {
    grid-template-columns: minmax(50px, 90px) minmax(50px, 275px);
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
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
