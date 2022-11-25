const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.use(cors());
app.use(express.json());

app.post("/cadastrar", (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { telefone } = req.body;

  let sql = "INSERT INTO clientes (nome, email, telefone) VALUES (?,?,?)";

  db.query(sql, [nome, email, telefone], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  })
});

app.get("/listar", (req, res) => {
  let sql = "SELECT * FROM clientes";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  })
});

app.post("/editar", (req, res) => {
  const { id } = req.body;
  const { nome } = req.body;
  const { email } = req.body;
  const { telefone } = req.body;

  let sql = "UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?";
  console.log('foi');

  db.query(sql, [nome, email, telefone, id], (err, result) => {
    console.log('dentro');
    if (err) {
      console.log(err);
      console.log('id aqui: ', id)
    } else {
      res.send(result);
      console.log(result);
      console.log('id aqui: ', id);
    }
  })
});

app.delete("/deletar/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM clientes WHERE id = (?)";
  db.query(mysql, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log('rodando servidor');
});