import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/api/useSignUp";
import { AuthLayout, Button, Label, Row, Title } from "../auth-styles/AuthStyle";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast("As senhas devem ser iguais!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
    } else if (password.length < 6) {
      toast("A senha deve ter no mínimo 6 caracteres!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
    } else {
      try {
        await signUp(email, password);
        toast("Inscrito com sucesso! Por favor, faça login.", {
          progressStyle: {
            background:
              "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
          },
        });
        navigate("/");
      } catch (error) {
        toast("Não foi possível fazer o cadastro!", {
          progressStyle: {
            background:
              "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
          },
        });
      }
    }
  }

  return (
    <AuthLayout>
      <Title>
        <h1>SonoreEvents</h1>
      </Title>
      <Row>
        <Label>Inscrição</Label>
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
          <input
            placeholder="Repita sua senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" color="primary" disabled={loadingSignUp}>
            Inscrever
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/">Já está inscrito? Faça login</Link>
      </Row>
    </AuthLayout>
  );
}
