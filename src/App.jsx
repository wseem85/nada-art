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

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/originals" element={<Originals />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/image" element={<ImagePage />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
