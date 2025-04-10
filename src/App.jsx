import React, { useState, useEffect } from "react"; // 'useState' ve 'useEffect' import edilmesi gerekiyor
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Header from "./layout/Header";
import Register from "./pages/Register";
import MovieDetail from "./pages/MovieDetail";
import { AuthProvider } from "./context/AuthContext"; // AuthProvider import edilmesi gerekiyor
import AdminPanel from "./pages/admin/AdminPanel";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Giriş durumunu kontrol et (bu, login durumuna göre değişebilir)
  useEffect(() => {
    // Örneğin, localStorage veya auth durumuna göre kontrol
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthProvider value={{ isAuthenticated, setIsAuthenticated }}>
      {" "}
      {/* AuthProvider ile context sağlanıyor */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={<Movies isAuthenticated={isAuthenticated} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route
          path="/genres/:id/movies"
          element={<Movies isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/actors/:id/movies"
          element={<Movies isAuthenticated={isAuthenticated} />}
        />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/add" element={<AddMovie />} />
        <Route path="/admin/edit/:id" element={<EditMovie />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
