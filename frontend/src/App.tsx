import "./App.css";
import Layout from "@components/Layout";
import Account from "@components/Account";
import Auth from "@components/Auth";
import AuthContext from "@components/AuthContext";
import useAuth from "./hooks/useAuth";

function App() {
  const { session, loading, user, handleSignOut, handleAuthSuccess } =
    useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <AuthContext
        value={{
          user: user,
          signOut: handleSignOut,
        }}
      >
        {session ? <Account /> : <Auth onAuthSuccess={handleAuthSuccess} />}
      </AuthContext>
    </Layout>
  );
}

export default App;
