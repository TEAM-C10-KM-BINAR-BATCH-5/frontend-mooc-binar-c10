import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Kelas from "./pages/Kelas";
import Not_found from "./pages/404-notFound";

// check component/layout
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="kelas" element={<Kelas />} />
        </Route>
        <Route path="*" element={<Not_found />} />
      </Routes>
    </Router>
  );
}

export default App;
