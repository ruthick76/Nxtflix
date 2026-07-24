import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Header from "./components/Header/Header.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Home from "./pages/Home/Home.jsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.jsx";
import WatchLater from "./pages/WatchLater/WatchLater.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function AppLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Home />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <MovieDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/watch-later"
        element={
          <ProtectedRoute>
            <AppLayout>
              <WatchLater />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
