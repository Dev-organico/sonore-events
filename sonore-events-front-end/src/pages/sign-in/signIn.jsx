import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout, Button, Label, Row, Title } from "../auth-styles/AuthStyle";
import UserContext from "../../contexts/UserContext";
import useSignIn from "../../hooks/api/useSignIn";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loadingSignIn, signIn } = useSignIn();

  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast("Login realizado com sucesso!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
      navigate("/home");
    } catch (err) {
      toast("Não foi possível fazer o login!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
    }
  }

  return (
    <AuthLayout>
      <Title>
        <h1>SonoreEvents</h1>
      </Title>
      <Row>
        <Label>Login</Label>
        <form onSubmit={submit}>
          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" color="primary" disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/sign-up">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
