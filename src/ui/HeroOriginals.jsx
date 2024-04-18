import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
// import Paragraph from "../ui/Pharagraph";
import Heading from "../ui/Heading";
import { useEffect, useState } from "react";
const HeroContainer = styled.div`
  position: relative;
  height: calc(100vh - 50px);
  max-width: 100vw;

  background-image: url("/images/originalsheromobile.webp");
  background-size: cover;
  background-repeat: no-repeat;
  /* background-position: center; */
  /* background-attachment: fixed; */

  transition: background-image 1s ease-in-out;

  background-color: var(--color-brand-50);
  ${media(breakpoints.sm)} {
    background-image: url("/images/originalshero.webp");
  }
`;
const HeroOriginalsIntro = styled.div`
  background-color: var(--color-brand-midTransparency);
  position: absolute;
  top: 20%;
  width: 100%;
  height: 80%;

  /* padding: rem 2rem; */
  color: var(--color-grey-100);
  /* width: 100%; */
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
    height: 70%;
  }
`;
const PageHeading = styled(Heading)`
  padding-top: 3.5rem;

  font-size: 2rem;
  letter-spacing: 14px;
  text-align: center;
  ${media(breakpoints.xs)} {
    font-size: 3.8rem;
  }
  ${media(breakpoints.sm)} {
    font-size: 5rem;
  }
`;
const IntroHeading = styled(Heading)`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 6px;
  font-weight: bold;
  padding-left: 0.3rem;

  ${media(breakpoints.xs)} {
    font-size: 2rem;
    padding-left: 0;
  }
  ${media(breakpoints.sm)} {
    font-size: 3.5;
    padding-left: 0;
  }
  transform: translateX(-100%);

  animation: move-in 1.5s forwards;
  @keyframes move-in {
    to {
      transform: translateX(0);
    }
  }
`;
const IntroParagraph = styled(Heading)`
  letter-spacing: 4px;
  font-weight: bold;
  font-size: 1rem;
  opacity: 0;
  padding-left: 0.3rem;
  animation: fade-in 4s forwards;
  ${media(breakpoints.xs)} {
    font-size: 1.5rem;
  }
  ${media(breakpoints.sm)} {
    padding-left: 0;
    font-size: 2rem;
  }
  @keyframes fade-in {
    to {
      opacity: 1;
    }
  }
`;
const IntroSpan = styled.span`
  display: inline-block;
  /* width: 10rem;
  height: 10rem; */
  padding: 0.5rem 0.8rem;
  background-color: var(--color-brand-300);
  /* border-right-radius: 3px; */
  color: var(--color-grey-100);
  transform: translateX(-${(props) => props.no * 110}%);
  animation: move-in 2s 2s forwards;
  @keyframes move-in {
    to {
      transform: translateX(0);
    }
  }
`;
const introContent = [
  {
    title: "Differnt Categories",
    description: "You can explore you prefered Cateegory",
    subDescription: ["Abstract", "Charcoal", "Portriait"],
  },
  {
    title: "Devirse Price Range",
    description: `Prices go Between $599 to $ 3500\nwith a discount hits 20%`,
    subDescription: ["Sale 5%", "Sale 10%", "Sale 20%"],
  },
  {
    title: "Different Dimensions",
    description:
      "Choose Your perfect Match of a group of different dimensions ",
    subDescription: ["18x24", "24x32", "28x42"],
  },
];
export default function HeroOriginals() {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentContentIndex(
        (prevIndex) => (prevIndex + 1) % introContent.length
      );
    }, 7000);

    return () => clearInterval(intervalId);
  }, [currentContentIndex]);
  return (
    <HeroContainer>
      <PageHeading as="h1">Originals</PageHeading>
      <HeroOriginalsIntro>
        <IntroHeading as="h3" key={introContent.at(currentContentIndex).title}>
          {introContent.at(currentContentIndex).title}
        </IntroHeading>
        <IntroParagraph
          as="h4"
          key={introContent.at(currentContentIndex).description}
          color="var(--color-grey-100)"
        >
          {introContent.at(currentContentIndex).description}
        </IntroParagraph>
        <div
          color="var(--color-grey-100)"
          key={introContent.at(currentContentIndex).subDescription.at(0)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "50vw",
          }}
        >
          {introContent
            .at(currentContentIndex)
            .subDescription.map((item, i) => (
              <IntroSpan key={item} no={i + 1}>
                {item}
              </IntroSpan>
            ))}
        </div>
      </HeroOriginalsIntro>
    </HeroContainer>
  );
}
