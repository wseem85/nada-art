// import styled from "styled-components";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Originals from "./pages/Originals";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import ImagePage from "./pages/ImagePage";
import PageNotFound from "./ui/PageNotFound";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Search from "./pages/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { CurrentUserProvider } from "./contexts/CurrentUserProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <Toaster
          position="top center"
          gutter={12}
          containerStyle={{ margin: "5px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-gry-700)",
            },
          }}
        />
        <CurrentUserProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/originals" element={<Originals />} />
                <Route path="/originals/:id" element={<ImagePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/account" element={<Account />} />
                <Route path="/image" element={<ImagePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </CurrentUserProvider>
      </QueryClientProvider>
    </>
  );
}
