import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { LayoutComponents } from "../../components/LayoutComponents";

export const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', { email, password });
    login(email, password);
  }

  return (
    <LayoutComponents>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="conteudo-login-form-titulo">Login</h1>

        <div className="conteudo-login-form-input">
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="conteudo-login-form-input">
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha" />
        </div>

        <div className="conteudo-login-form-botao">
          <button className="login-form-botao" type="submit" >Entrar</button>
        </div>

        <div className="conteudo-login-texto">
          <span className="login-texto">Não possui conta?</span>
          <Link className="login-link" to="/cadastro">Criar conta</Link>
        </div>
      </form>
    </LayoutComponents>
  );
}