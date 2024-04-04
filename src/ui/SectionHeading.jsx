import styled from "styled-components";
import Heading from "./Heading";
const StyledSectionHeading = styled(Heading)`
  position: relative;
  text-transform: uppercase;
  letter-spacing: var(--letter-space-lg);
  line-height: var(--line-md);
  font-weight: bold;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 300px;
  &::after {
    content: "";
    position: absolute;
    width: 30%;
    height: 2px;
    left: 50%;
    bottom: -14px;
    transform: translateX(-50%);
    background-color: var(--color-brand-300);
    transition: width 0.3s;
  }

  &:hover::after {
    width: 50%;
  }
`;
export default function SectionHeading({ children }) {
  return <StyledSectionHeading as="h3">{children}</StyledSectionHeading>;
}
