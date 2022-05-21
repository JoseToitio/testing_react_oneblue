import React, { useState } from "react";
import { LoginDiv, FormLogin } from "./styles";
import {useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(false);
  const [notPass, setNotPass] = useState(true);
  const [error, setError] = useState('');
  const history = useNavigate();
  let schema = yup.object().shape({
    name: yup.string().required("O Name campo é obrigatório.")
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate({ name, password})
      fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, password})
      }).then((res) => {
        if (res.ok) {
          setPass(true);
          setNotPass(true);
          setTimeout(() => history('/admin'), 3000)
        } else {
          setNotPass(false);
          setPass(false);
        }
      })
      setError('')
    }catch (err) {
      setError(err.errors)
    }

  };

  return (
    <LoginDiv id="login">
      <h1 className="title">Login</h1>
      <FormLogin className="form" onSubmit={handleSubmit}>
      {<p>{error}</p>}
        <div className="formulario">
          <label htmlFor="name">Name</label>
          <input 
            name="name"
            type="text"
            id="name"
            value={name}
            onChange={ (e) => setName(e.target.value)} 
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button">
            <button type="submit">Entrar</button>
          </div>
        </div>
      <h5 hidden={!pass}>Carregando....</h5> 
      <h5 hidden={notPass}>Usuário não cadastrado</h5>
      </FormLogin>
    </LoginDiv>
  );
}
