import "./App.css";
import { useEffect, useState } from "react";
import type { Session } from "@utils/types";
import Layout from "@components/Layout";
import Account from "@components/Account";
import Auth from "@components/Auth";
import type { User } from "@backend/types";
import AuthContext from "@components/AuthContext";
import { API_URL } from "@utils/api";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if user is already signed in
    const token = localStorage.getItem("supabase_token");
    if (token) {
      setSession({ access_token: token });
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/self`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch user:", errorData);

        // token is invalid, remove it + clear user/session
        localStorage.removeItem("supabase_token");

        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("supabase_token");
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (session: Session, user: User) => {
    setUser(user);
    setSession(session);
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
      setUser(null);
    } catch (error) {
      console.error("Signout error:", error);
    }
  };

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
