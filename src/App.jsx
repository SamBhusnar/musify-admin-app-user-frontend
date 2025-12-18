export const API_BASE_URL = "http://localhost:8080";
import Toaster from "react-hot-toast";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import AddSong from "./Pages/AddSong";
import ListSong from "./Pages/ListSong";
import AddAlbum from "./Pages/AddAlbum";
import ListAlbum from "./Pages/ListAlbum";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/list-songs" element={<ListSong />} />
          <Route path="/add-album" element={<AddAlbum />} />
          <Route path="/list-albums" element={<ListAlbum />} />
          <Route path="*" element={<AddSong />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
