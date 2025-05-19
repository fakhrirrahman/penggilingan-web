import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layanan from "./pages/Layanan";
import DashboardPanel from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route: harus login dulu */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPanel />
            </ProtectedRoute>
          }
        />
        {/* Route lainnya */}
        <Route
          path="/layanan"
          element={
            <ProtectedRoute>
              <Layanan />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
