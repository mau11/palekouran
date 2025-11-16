import { Routes, Route } from "react-router"; // https://reactrouter.com/start/declarative/routing
import "./App.css";
import Layout from "@components/Layout";
import Home from "@components/Home";
import AuthForm from "@components/AuthForm";
import ProtectedLayout from "@components/ProtectedLayout";
import Account from "@components/Account";
import AuthContext from "@contexts/AuthContext";
import useAuth from "@customHooks/useAuth";

function App() {
  const auth = useAuth();

  if (auth.loading) return <p>Loading...</p>;

  return (
    <AuthContext value={auth}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </AuthContext>
  );
}

export default App;
