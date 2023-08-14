import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import apis from "../services/apis"


export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", cpf: "", phone: "", email: "", password: "", confirmPassword: "" })
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
    // if (!validateForm()) {
    //   setErrorMessage('Por favor, corrija os campos inválidos.');
    //   return;
    // }

    const signupData = {
      name: form.name,
      cpf: form.cpf,
      phone: form.phone,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword
    };

    console.log(signupData)

    apis.signUp({ ...form })
      .then(res => {

        navigate("/")
      })
      .catch(err => {

        if (err.response && err.response.status === 409) {
          setErrorMessage('E-mail já cadastrado. Por favor, utilize outro e-mail.');
        } else {
          setErrorMessage('Erro, tente novamente.', err);
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
          data-test="cpf"
          placeholder="CPF"
          type="text"
          name="cpf"
          onChange={handleForm}
          value={form.cpf}
          required
          invalid={invalidFields.cpf}
        />
        <Input
          data-test="phone"
          placeholder="Telefone"
          type="text"
          name="phone"
          onChange={handleForm}
          value={form.phone}
          required
          invalid={invalidFields.phone}
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
        <Text>Já tem uma conta? <SubText>Entre agora!</SubText></Text>
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
  background: linear-gradient(
    to bottom,
    #CE8BF8,
    #F28F8F
  );
  
  
`

const SubText = styled.span`
color: #8C5B8C; /* Tom de roxo mais escuro */

`

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`

const Input = styled.input`
  border: ${({ invalid }) => invalid ? '1px solid red' : 'initial'};
`

const Text = styled.span`
 font-size: 18px;
`
