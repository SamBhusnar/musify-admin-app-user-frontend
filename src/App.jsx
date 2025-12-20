import Toaster from "react-hot-toast";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AddSong from "./pages/AddSong";
import ListSong from "./pages/ListSong";
import AddAlbum from "./pages/AddAlbum";
import ListAlbum from "./pages/ListAlbum";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-song"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AddSong />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-songs"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ListSong />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-album"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AddAlbum />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-albums"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ListAlbum />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AddSong />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
