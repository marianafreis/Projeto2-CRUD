import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import Cliente from '../../components/clientes/cliente';
import './styles.css';
import Axios from 'axios';

export const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }

  const [values, setValues] = useState();
  const [listClientes, setListClientes] = useState();

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleCreateButton = () => {
    Axios.post("http://localhost:3001/cadastrar", {
      nome: values.nome,
      email: values.email,
      telefone: values.telefone,
    }).then((response) => {
      setListClientes([
        ...listClientes,
        {
          id: response.data[0].id,
          nome: values.nome,
          email: values.email,
          telefone: values.telefone,
        },
      ]);
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/listar").then((response => {
      setListClientes(response.data);
    }));
  }, []);

  return (
    <div className="conteudo">
      <div className="conteudo-cadastro">
        <div className="conteudo-cadastro-cabecalho">
          <h1 className="conteudo-cadastro-cabecalho-titulo">Clientes</h1>
          <button className="botao-logout" onClick={handleLogout}>Sair</button>
        </div>

        <div className="conteudo-cadastro-field">
          <input
            className="conteudo-cadastro-input"
            type="text"
            name="nome"
            placeholder="Nome"
            onChange={handleChangeValues}
          />
          <input
            className="conteudo-cadastro-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChangeValues}
          />
          <input
            className="conteudo-cadastro-input"
            type="text"
            name="telefone"
            placeholder="Telefone"
            onChange={handleChangeValues}
          />
          <button className="botao-cadastro" onClick={() => handleCreateButton()}>Cadastrar</button>
        </div>
      </div>

      <div className="conteudo-lista">
        <h2 className="conteudo-lista-titulo">Clientes Cadastrados</h2>
        <div className="conteudo-lista-cabecalho">
          <p>ID</p>
          <p>NOME</p>
          <p>EMAIL</p>
          <p>TELEFONE</p>
        </div>
        {typeof listClientes !== "undefined" && listClientes.map((value) => {
          return (
            <Cliente
              key={value.id}
              listCliente={listClientes}
              setListCliente={setListClientes}
              id={value.id}
              nome={value.nome}
              email={value.email}
              telefone={value.telefone}
            ></Cliente>
          );
        })}
      </div>
    </div>
  );
}