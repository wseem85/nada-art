import { Outlet } from "react-router-dom";
import styled from "styled-components";
// import media from "styled-media-query";
import Header from "./Header";
import Footer from "./Footer";
// import { ImagesProvider } from "../contexts/ImagesContext";

const breakpoints = {
  xs: "320px",
  sm: "768px",
  md: "1024px",
  lg: "1280px",
};

const media = (query) => `@media (min-width: ${query})`;

const StyledAppLayout = styled.div`
  display: grid;

  /* grid-template-columns: 1fr;
  grid-template-rows: auto 1fr; */
  /* height: 100vh; */
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  position: relative;
  top: 60px;
  /* position: relative; */
  /* padding: 0.75rem; */
  ${media(breakpoints.sm)} {
  }
  ${media(breakpoints.md)} {
  }
`;

// const Container = styled.div`
//   /* max-width: 120rem; */
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `;
export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />

      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}
