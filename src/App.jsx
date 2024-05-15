// import styled from "styled-components";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Originals from "./pages/Originals";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import { AppNavProvider } from "./contexts/AppNavContext";
import { StoredCartProvider } from "./contexts/StoredCartContext";
// import ImagePage from "./pages/ImagePage";
import PageNotFound from "./ui/PageNotFound";
// import Account from "./pages/Account";
import Login from "./pages/Login";
// import Logout from "./pages/Logout";
import Search from "./pages/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { CurrentUserProvider } from "./contexts/CurrentUserProvider";
import { SearchResultsProvider } from "./contexts/SearchResultsContext";
import { AllImagesProvider } from "./contexts/AllImagesContext";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
// import ImagePageLimited from "./pages/ImagePageLimited";
// import ImagePageExtended from "./pages/ImagePageExtended";
import ImagePage from "./pages/ImagePage";

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
        <AppNavProvider>
          <CurrentUserProvider>
            <AllImagesProvider>
              <SearchResultsProvider>
                <StoredCartProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route element={<AppLayout />}>
                        <Route index element={<Navigate to="home" />} />
                        <Route path="home" element={<Homepage />} />
                        <Route path="originals" element={<Originals />} />
                        <Route path="originals/:id" element={<ImagePage />} />
                        <Route path="search" element={<Search />} />
                        <Route path="search/:id" element={<ImagePage />} />

                        <Route path="about" element={<About />} />
                        <Route path="settings" element={<Settings />}></Route>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="signup" element={<Signup />}></Route>

                        <Route
                          path="account/image/:id"
                          element={<ImagePage />}
                        />
                      </Route>
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </BrowserRouter>
                </StoredCartProvider>
              </SearchResultsProvider>
            </AllImagesProvider>
          </CurrentUserProvider>
        </AppNavProvider>
      </QueryClientProvider>
    </>
  );
}
