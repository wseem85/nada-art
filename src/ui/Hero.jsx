import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import Button from "./Button";
const StyledHero = styled.div`
  position: relative;
  height: calc(100vh - 50px);
  width: 100vw;
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
  width: 100vw; // Ensure full viewport width
  height: 100vh; // Ensure full viewport height
  display: flex; // Allow content to align within
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  background-color: var(--color-brand-50);

  ${media(breakpoints.sm)} {
    width: 60vw;
  }
  ${media(breakpoints.lg)} {
  }
`;
const StyledHeroIntro = styled.div`
  background-color: var(--color-brand-midTransparency);
  padding: 4rem 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fade-in 2s forwards;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  ${media(breakpoints.sm)} {
    padding: 6rem 2rem;
    gap: 3.5rem;
  }
`;
const images = [
  "images/hero-img-1.jpg",
  "images/hero-img-2.jpg",
  "images/hero-img-3.jpg",
  "images/hero-img-4.jpg",
  "images/hero-img-5.jpg",
];
const introTextContent = [
  { title: "Start Collecting Art", btn: "Buy Originals" },
  { title: "Explore Categories", btn: "Search Now" },
  { title: "Draw Your Thoughts", btn: "Draw Me" },
  { title: "Get In Touch", btn: "Follow me" },
  { title: "Know More About the Artist", btn: "About Me" },
];
export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  const imageStyle = {
    backgroundImage: `url(${images[currentImageIndex]})`,
  };

  return (
    <StyledHero style={imageStyle}>
      <StyledHeroIntro key={introTextContent.at(currentImageIndex).title}>
        <Heading
          as="h1"
          style={{
            color: "var(--color-grey-100)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {introTextContent.at(currentImageIndex).title}
        </Heading>
        <Button size="large" variation="secondary">
          {introTextContent.at(currentImageIndex).btn}
        </Button>
      </StyledHeroIntro>
    </StyledHero>
  );
}
