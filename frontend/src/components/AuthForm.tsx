import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Form,
  FormRow,
  HeaderOne,
  InputError,
  Label,
  StyledInput,
  SubmitButton,
  Wrapper,
} from "@globalStyles";
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
  const [showPassword, setShowPassword] = useState(false);

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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Wrapper>
      <HeaderOne>{isSignup ? "Sign up" : "Log in"}</HeaderOne>

      <Form onSubmit={handleSubmit}>
        {error && <InputError>{error}</InputError>}
        {isSignup && (
          <FormRow>
            <Label htmlFor="username">Username</Label>
            <StyledInput
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
          <StyledInput
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
          <StyledInput
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              onClick={handleShowPassword}
            />
            <label htmlFor="showPassword">Show password</label>
          </span>
        </FormRow>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Loading..." : isSignup ? "Sign up" : "Log in"}
        </SubmitButton>
      </Form>

      <AuthSubtext>
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link to={isSignup ? "/login" : "/signup"}>
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </AuthSubtext>
    </Wrapper>
  );
};

export default AuthForm;
