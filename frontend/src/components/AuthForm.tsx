import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Form, FormRow, HeaderTwo, InputError, Label } from "@globalStyles";
import { AuthSubtext } from "./AuthForm.styled";
import AuthContext from "@contexts/AuthContext";
import { API_URL } from "@utils/api";

const AuthForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    throw new Error("Account info not found");
  }

  const { handleAuthSuccess } = auth;
  const isSignup = useLocation().pathname === "/signup";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setError("");
    if (auth.session) {
      navigate("/");
    }
  }, [isSignup]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isSignup ? "signup" : "signin";
      const body = isSignup
        ? { email, password, username }
        : { email, password };

      const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // store session token
      localStorage.setItem("supabase_token", data.session.access_token);
      handleAuthSuccess(data.session, data.user);

      navigate("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <HeaderTwo>{isSignup ? "Sign up" : "Log in"}</HeaderTwo>

      {error && <InputError>{error}</InputError>}

      <Form onSubmit={handleSubmit}>
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
        <Link to={isSignup ? "/login" : "/signup"}>
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </AuthSubtext>
    </section>
  );
};

export default AuthForm;
