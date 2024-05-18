import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

const StyledSelect = styled.select`
  padding: 0.3rem 0.6rem;
  box-shadow: var(--shadow-sm);
  max-width: 8rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  ${media("250px")} {
    max-width: 12rem;
  }
  ${media("350px")} {
    max-width: unset;
  }
  ${media(breakpoints.xs)} {
    padding: 0.7rem 1.3rem;
  }
`;

function Select({ name, onChange, dValue, options }) {
  return (
    <StyledSelect
      name={name}
      options={options}
      onChange={onChange}
      defaultValue={dValue}
    >
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
          // selected={selectedOption === option.value}
        >
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
