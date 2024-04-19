import styled from "styled-components";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
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
  margin-bottom: 1rem;
  width: 200px;
  &::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 100%;
    left: -0.7rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--color-brand-300);
    transition: width 0.3s;
  }
  &::before {
    content: "";
    position: absolute;
    width: 1rem;
    height: 100%;
    right: -0.7rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--color-brand-300);
    transition: width 0.3s;
  }

  &:hover::after {
    width: 50%;
  }
`;
export default function SectionHeading({ children }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <StyledSectionHeading as="h3">{children}</StyledSectionHeading>
      <Paragraph style={{ marginBottom: "3rem" }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse pariatur
        labore ab.
      </Paragraph>
    </div>
  );
}
