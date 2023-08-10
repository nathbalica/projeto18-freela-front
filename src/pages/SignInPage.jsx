import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import useAuth from "../hooks/auth"
import apis from "../services/apis"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"



export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login } = useAuth();

  const navigate = useNavigate()

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidFields, setInvalidFields] = useState({});

  function validateForm() {
    let invalidFields = {};

    // Validação do e-mail
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      invalidFields.email = true;
    }

    // Validação da senha
    if (form.password.length < 3) {
      invalidFields.password = true;
    }

    setInvalidFields(invalidFields);
    return Object.keys(invalidFields).length === 0;
  }

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function loginUser(e) {
    e.preventDefault()

    if (!validateForm()) {
      setErrorMessage('Por favor, corrija os campos inválidos.');
      return;
    }
    
    apis.login({ ...form })
      .then(res => {
        login(res.data)
        navigate('/home')
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage('Credenciais inválidas. Verifique seu e-mail e senha.');
        } else {
          setErrorMessage('Erro, tente novamente.');
        }
      })
  }

  return (
    <SingInContainer>
      <form onSubmit={loginUser}>
        <MyWalletLogo />
        <Input
          data-test="email"
          placeholder="E-mail"
          type="email"
          name="email"
          value={form.email}
          onChange={handleForm}
          autoComplete="username"
          invalid={invalidFields.email}
          ref={emailRef}
        />
        <Input
          data-test="password"
          placeholder="Senha"
          minLength={3}
          type="password"
          autoComplete="new-password"
          name="password"
          value={form.password}
          onChange={handleForm}
          invalid={invalidFields.password}
          ref={passwordRef}
          
        />
         {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <button className="auth-button" type="submit" data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to="/signup">
        Primeira vez? <GreenText>Cadastre-se!</GreenText>
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #0ACF83, #000000);
  padding: 25px;
  

`

const GreenText = styled.span`
  color: #0ACF83;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Input = styled.input`
  border: ${({ invalid }) => invalid ? '1px solid red' : 'initial'};
`;
