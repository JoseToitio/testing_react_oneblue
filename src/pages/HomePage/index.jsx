import React, { useState } from 'react';
import * as yup from 'yup';
import { CadastroDiv, FormCadastro } from "./styles";
import {Link} from 'react-router-dom';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pass, setPass] = useState(false);
  const [notPass, setNotPass] = useState(true);
  const [error, setError] = useState('');
  let schema = yup.object().shape({
    name: yup.string().required("O Name campo é obrigatório."),
    password: yup.string().min(6, 'Password precisa ser maior que 6 digitos').required("O campo é obrigatório."),
  });

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, password}
    try {
      await schema.validate(user);
      fetch('http://localhost:4000/user/cadaster', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      }).then((res) => {
        console.log(res)
        if (res.ok) {
          setPass(true);
          setNotPass(true);
        } else {
          setNotPass(false);
          setPass(false);
        }
        setError('')
      })
    } catch (err) {
      setError(err.errors);
    }

  };

  return (
    <CadastroDiv id="cadastro">
      <h1 className="title">Cadastro</h1>
      <FormCadastro className="form" onSubmit={handleSubmit}>
        <div className="formulario">
          {<p>{error}</p>}
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
            <button type="submit">Cadastrar</button>
            <h5 hidden={!pass}>Usuario Cadastrado</h5>
            <h5 hidden={notPass}>Usuario já cadastrado</h5>
          </div>
          <Link to="/login">Login</Link>
        </div>
      </FormCadastro>
    </CadastroDiv>
  );
}
