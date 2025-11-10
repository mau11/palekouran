import { useState } from "react";
import { Form, FormRow, HeaderTwo, InputError, Label } from "../Global.styled";
import { AuthSubtext } from "./Auth.styled";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type AuthProps = {
  onAuthSuccess: (session: any) => void;
};

const Auth = ({ onAuthSuccess }: AuthProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store session token
      localStorage.setItem("supabase_token", data.session.access_token);
      onAuthSuccess(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // store session token
      localStorage.setItem("supabase_token", data.session.access_token);
      onAuthSuccess(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <HeaderTwo>{isSignup ? "Sign up" : "Log in"}</HeaderTwo>

      {error && <InputError>{error}</InputError>}

      <Form onSubmit={isSignup ? handleSignup : handleLogin}>
        {isSignup && (
          <FormRow>
            <Label htmlFor="username">Username</Label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormRow>
        )}

        <FormRow>
          <Label htmlFor="email">Email</Label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="password">Password</Label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormRow>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : isSignup ? "Sign up" : "Log in"}
        </button>
      </Form>

      <AuthSubtext>
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <a
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup ? "Log In" : "Sign Up"}
        </a>
      </AuthSubtext>
    </section>
  );
};

export default Auth;
