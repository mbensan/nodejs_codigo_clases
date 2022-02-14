const express = require('express');
const moment = require('moment');
const axios = require('axios');
const chalk = require('chalk');
const uuid = require('uuid');

const app = express();

let usuarios;

// acá realizamos los requerimientos del desafío

app.get('/', (req, res) => {
  res.end('lista de usuario')
})

app.get('/momento', (req, res) => {
  const ahora = moment().format('MMMM Do YYYY, hh:MM:SS a');
  res.end(`Ahora es ${ahora}.`)
})

app.get('/rick',  async (req, res) => {
  let data = await axios.get('https://rickandmortyapi.com/api/character/1')
  res.send(`El personaje buscado se llama ${data.data.name}`);
})

app.listen(3000, () => {
  console.log(chalk.blue.bgWhite('servidor funcionando en el puerto 3000'));
  const id = uuid.v4();
  console.log('Ejemplo de identificado único', id);
  console.log('Los últimos 6 caracteres del UUID', id.substr(id.length - 6));
})
