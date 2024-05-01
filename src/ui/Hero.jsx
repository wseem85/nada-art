import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const StyledHero = styled.div`
  height: calc(100vh - 60px);
  width: 100vw;

  background-size: cover;
  background-position: center;

  transition: background-image 1s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-brand-50);

  ${media(breakpoints.sm)} {
    width: 60vw;
  }
  ${media(breakpoints.lg)} {
  }
`;
const StyledHeroIntro = styled.div`
  background-color: rgba(219, 176, 176, 0.3);

  padding: 3rem 2rem;
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
  "images/hero-img-1.webp",
  "images/hero-img-2.webp",
  "images/hero-img-3.webp",
  "images/hero-img-4.webp",
  "images/hero-img-5.webp",
];
const introTextContent = [
  { title: "Start Collecting Art", btn: "Buy Originals" },
  { title: "Explore Categories", btn: "Search Now" },
  { title: "Draw Your Thoughts", btn: "Draw Me" },
  { title: "Get In Touch", btn: "Follow Me" },
  { title: "Know More About the Artist", btn: "About Me" },
];
export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  function handleClick() {
    if (currentImageIndex === 0 || currentImageIndex === 1) {
      navigate("/originals");
    }
    if (
      currentImageIndex === 2 ||
      currentImageIndex === 3 ||
      currentImageIndex === 4
    ) {
      navigate("/search");
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);
  useEffect(() => {
    const preloadImages = () => {
      const allImages = images.map((imageUrl) => (new Image().src = imageUrl));
      Promise.all(allImages).then(() => setIsLoaded(true));
    };

    preloadImages();

    // ... other useEffect logic
  }, []);
  const imageStyle = {
    backgroundImage: `url(${images[currentImageIndex]})`,
  };

  return (
    <StyledHero style={isLoaded ? imageStyle : null}>
      <StyledHeroIntro key={introTextContent.at(currentImageIndex).title}>
        <Heading as="h1">
          {introTextContent.at(currentImageIndex).title}
        </Heading>
        <Button size="large" variation="secondary" onClick={handleClick}>
          {introTextContent.at(currentImageIndex).btn}
        </Button>
      </StyledHeroIntro>
    </StyledHero>
  );
}
