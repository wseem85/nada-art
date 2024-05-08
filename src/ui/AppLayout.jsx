import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Cart from "../features/cart/Cart";
import { useAppNav } from "../contexts/AppNavContext";
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
  display: flex;
  position: relative;
  flex-direction: column;
`;

const Main = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-50);
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
  const { cartIsOpen } = useAppNav();
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>

      <Footer />
      {cartIsOpen && <Cart />}
    </StyledAppLayout>
  );
}
