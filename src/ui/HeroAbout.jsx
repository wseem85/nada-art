import styled from "styled-components";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
// import video from "videos/video.mp4";
// const PageTitle = styled.h1`
//   text-align: center;

//   height: 7rem;

//   /* background-color: var(--color-brand-500); */
//   background-color: var(--color-brand-500);
//   color: var(--color-grey-100);
// `;
const HeroAboutContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 560px;
  ${media(breakpoints.xs)} {
    height: 700px;
  }
  ${media(breakpoints.sm)} {
    height: 800px;
  }
  ${media(breakpoints.pmd)} {
    height: 850px;
  }
  ${media(breakpoints.md)} {
    height: 950px;
  }
  ${media(breakpoints.lg)} {
    height: 1200px;
  }
  & > video {
    object-fit: cover; /* Adjust as needed (cover, contain, fill) */
    width: 100%;
    /* height: calc(100vw / 1.77777778); */
    /* height: 100%; */
    position: absolute;
    top: 0;
    left: 0;
    background-position: center;

    /* z-index: -1; */
    z-index: 10;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-brand-smallTransparency);
  z-index: 11;
`;
export default function HeroAbout() {
  return (
    <HeroAboutContainer>
      {/* <PageTitle>Nada Story</PageTitle> */}
      <Overlay></Overlay>
      <video autoPlay loop muted>
        <source
          src="https://ipowdbuqcnnksefmhfzd.supabase.co/storage/v1/object/public/videos/video.mp4?t=2024-05-08T12%3A09%3A57.152Z"
          type="video/mp4"
        />
      </video>
    </HeroAboutContainer>
  );
}
