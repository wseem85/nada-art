import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import Heading from "./Heading";
import Button from "./Button";
import Paragraph from "./Paragraph";
import { useNavigate } from "react-router-dom";
const StyledHeroIntro = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  padding: 2rem 2rem;

  ${media(breakpoints.sm)} {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 60%;

    padding: 4rem 2rem;
    gap: 3.5rem;
  }
`;

export default function HeroTitling() {
  const navigate = useNavigate();
  return (
    <StyledHeroIntro>
      <Heading as="h3">Welcome To My World Lorem, ipsum dolor sit</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. In mollitia
        placeat quia deserunt provident quaerat optio. Tempora modi, voluptatum
        laudantium cumque mollitia expedita, id commodi obcaecati ea veniam
        itaque deleniti?
      </Paragraph>
      <Button
        size="large"
        variation="primary"
        onClick={() => navigate("/originals")}
      >
        Buy Originals
      </Button>
    </StyledHeroIntro>
  );
}
