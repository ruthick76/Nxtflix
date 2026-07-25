import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import WatchLater from "./pages/WatchLater/WatchLater";
import SignIn from "./pages/SignIn/SignIn";
import NotFound from "./pages/NotFound/NotFound";
import { WatchLaterProvider } from "./context/WatchLaterContext";

// Layout for pages that need login + the Header navigation bar
const PrivateLayout = () => {
  return (
    <ProtectedRoute>
      <Header />
      <main>
        <Outlet />
      </main>
    </ProtectedRoute>
  );
};

function App() {
  return (
    // Wrap everything with WatchLaterProvider so all pages can access the saved list
    <WatchLaterProvider>
      <BrowserRouter>
        <Routes>

          {/* Public route — anyone can visit login page */}
          <Route path="/login" element={<SignIn />} />

          {/* Private routes — only visible when logged in */}
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/watch-later" element={<WatchLater />} />
          </Route>

          {/* Not Found pages — no header shown */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </WatchLaterProvider>
  );
}

export default App;
