import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Messages from "./pages/Messages";
import PrivateRoute from "./components/specific/PrivateRoute";
import { AuthProvider, useAuth } from "./contexts/Auth";
import RecoverPass from "./pages/RecoverPassword";
import Panel from "./pages/Panel";
import Analyses from "./pages/Analyses";
import Persona from "./pages/Persona";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Errors/401";
import NotFound from "./pages/Errors/404";
import './index.css'

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/recover-password/:token" element={<RecoverPass />} />

      <Route element={<PrivateRoute />}>
        <Route path="/panel" element={<Panel />} />
        <Route path="/analyses" element={<Analyses />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;