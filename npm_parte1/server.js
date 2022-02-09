const express = require('express');
const moment = require('moment');
const axios = require('axios');
const chalk = require('chalk');
const uuid = require('uuid');

const app = express();

// acá realizamos los requerimientos del desafío

app.get('/', (req, res) => {
  res.end('lista de usuario')
})

app.listen(3000, () => {
  console.log(chalk.green.bgYellow('servidor funcionando en el puerto 3000'));
  console.log('Ejemplo de identificado único', uuid.v4());
})
