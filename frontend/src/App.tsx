import { useEffect, useState } from "react";
import type { Session } from "@utils/types";
import Layout from "@components/Layout";
import Account from "./components/Account";
import Auth from "./components/Auth";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if user is already signed in
    const token = localStorage.getItem("supabase_token");
    if (token) {
      setSession({ access_token: token });
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (data: { session: Session }) => {
    setSession(data.session);
  };

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("supabase_token");
      if (!token) return;

      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("supabase_token");
      setSession(null);
    } catch (error) {
      console.error("Signout error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      {session ? (
        <Account session={session} onSignOut={handleSignOut} />
      ) : (
        <Auth onAuthSuccess={handleAuthSuccess} />
      )}
    </Layout>
  );
}

export default App;
