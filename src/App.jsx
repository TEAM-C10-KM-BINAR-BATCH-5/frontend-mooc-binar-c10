import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/shared/Layout";
import Kelas from "./pages/Kelas";
import NotFound from "./pages/404-notFound";
import KelolaCourse from "./pages/KelolaCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="kelas" element={<Kelas />} />
          <Route path="kelola-course/:id" element={<KelolaCourse />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
