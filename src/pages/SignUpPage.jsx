import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import apis from "../services/apis"
import logo from "../assets/logo.png"
// import { ThreeDots } from "react-loader-spinner"
import useAuth from "../hooks/auth";


export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [errorMessage, setErrorMessage] = useState('')
  const [invalidFields, setInvalidFields] = useState({})

  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateForm() {
    let invalidFields = {};

    // Validação do nome
    if (form.name.trim() === "") {
      invalidFields.name = true;
    }

    // Validação do e-mail
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      invalidFields.email = true;
    }

    // Validação da senha
    if (form.password.length < 3) {
      invalidFields.password = true;
    }

    // Validação da confirmação de senha
    if (form.password !== form.confirmPassword) {
      invalidFields.confirmPassword = true;
    }

    setInvalidFields(invalidFields);
    return Object.keys(invalidFields).length === 0;
  }

  function register(e) {
    e.preventDefault()
    if (!validateForm()) {
      setErrorMessage('Por favor, corrija os campos inválidos.');
      return;
    }

    const { confirmPassword, ...loginData } = form;


    const promise = apis.signUp(loginData)
    promise.then(res => {

      navigate("/")
    });
    promise.catch(err => {

      if (err.response && err.response.status === 409) {
        setErrorMessage('E-mail já cadastrado. Por favor, utilize outro e-mail.');
      } else {
        setErrorMessage('Erro, tente novamente.');
      }

    })

  }

  return (
    <SingUpContainer>
        <MyWalletLogo />
      <form onSubmit={register}>
        <Input
          data-test="name"
          placeholder="Nome"
          type="text"
          name="name"
          onChange={handleForm}
          value={form.name}
          required
          invalid={invalidFields.name}

        />
        <Input
          data-test="email"
          placeholder="E-mail"
          type="email"
          name="email"
          onChange={handleForm}
          value={form.email}
          required
          invalid={invalidFields.email}

        />
        <Input
          data-test="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          name="password"
          onChange={handleForm}
          value={form.password}
          required
          invalid={invalidFields.password}

        />
        <Input
          data-test="conf-password"
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          name="confirmPassword"
          onChange={handleForm}
          value={form.confirmPassword}
          required
          invalid={invalidFields.confirmPassword}
        />
        <button className="auth-button" type="submit" data-test="sign-up-submit">
          Cadastrar
        </button>
      </form>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Link to="/">
        Já tem uma conta? <GreenText>Entre agora!</GreenText>
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  background: linear-gradient(to bottom, #0ACF83, #000000);
  
`

const GreenText = styled.span`
  color: #0ACF83;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`

const Input = styled.input`
  border: ${({ invalid }) => invalid ? '1px solid red' : 'initial'};
`
