import { LayoutComponents } from "../../components/LayoutComponents";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <LayoutComponents>
      <form className="form">
        <h1 className="conteudo-login-form-titulo">Criar Conta</h1>

        <div className="conteudo-login-form-input">
          <input
            className="input"
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome" />
        </div>

        <div className="conteudo-login-form-input">
          <input
            className="input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email" />
        </div>

        <div className="conteudo-login-form-input">
          <input
            className="input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha" />
        </div>

        <div className="conteudo-login-form-botao">
          <button className="login-form-botao">Cadastrar</button>
        </div>

        <div className="conteudo-login-texto">
          <span className="login-texto">Já possui conta?</span>
          <Link className="login-link" to="/">Fazer login</Link>
        </div>
      </form>
    </LayoutComponents>
  );
}