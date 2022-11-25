import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.title,
    cost: props.cost,
    category: props.category,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditCliente = () => {
    Axios.put("http://localhost:3001/editar", {
      id: editValues.id,
      nome: editValues.nome,
      email: editValues.email,
      telefone: editValues.telefone,
    }).then(() => {
      props.setListCliente(
        props.listCliente.map((value) => {
          return value.id === editValues.id
            ? {
              id: editValues.id,
              nome: editValues.nome,
              email: editValues.email,
              telefone: editValues.telefone,
            }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteCliente = () => {
    Axios.delete(`http://localhost:3001/deletar/${editValues.id}`).then(() => {
      props.setListCliente(
        props.listCliente.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome"
            defaultValue={props.nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            defaultValue={props.email}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="telefone"
            label="Telefone"
            defaultValue={props.telefone}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteCliente()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditCliente()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}