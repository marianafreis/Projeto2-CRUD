import "./cliente.css";
import FormDialog from "../dialog/dialog";
import React from 'react';

export default function Cliente(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.nome}
        email={props.email}
        telefone={props.telefone}
        listCliente={props.listCliente}
        setListCliente={props.setListCliente}
        id={props.id}
      />
      <div className="conteudo-lista-cliente" onClick={() => setOpen(true)}>
        <p>{props.id}</p>
        <p>{props.nome}</p>
        <p>{props.email}</p>
        <p>{props.telefone}</p>
      </div>
    </>
  );
}