const axios = require('axios');
const express = require('express');
const { writeFile } = require('fs');
const fs = require('fs').promises;
const enviar_email = require('./email.js')
const app = express()

// esto es para os archivos estáticos
app.use(express.static('static'))
// esto es para el manejo de formularios
app.use(express.json());
app.use( express.urlencoded({ extended: true }) );

app.get('/email', (req, res) => {
  // acá  tienen que enviar el correo
  const destinatarios = req.query.destinatarios
  const asunto = req.query.asunto
  const contenido = req.query.contenido

  console.log(destinatarios, asunto, contenido);
  
  enviar_email(destinatarios, asunto, contenido)

  res.send('Email enviado')
})

app.get('/addAuto', async (req, res) => {
  // 1. primero creo el objeto a guardar
  const nuevoAuto = {
    marca: req.query.marca,
    modelo: req.query.modelo
  }
  // 2. después recupero mi base de datos desde un archivo JSON
  let db = await fs.readFile('db.json', 'utf-8')
  db = JSON.parse(db)
  // 3. guardo el auto
  db.autos.push(nuevoAuto)
  // 4. finalmente vuelvo a guardar el archivo JSON
  await fs.writeFile('db.json', JSON.stringify(db), 'utf-8')

  res.send('Auto guardado exitosamente')
});

app.get('/addAutoRandom', async (req, res) => {
  console.log('dds');
  const datos = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/honda?format=json')
  const autosApi = datos.data.Results
  const autoAzar = autosApi[Math.floor(Math.random() * autosApi.length)]

  let db = await fs.readFile('db.json', 'utf-8')
  db = JSON.parse(db)

  db.autos.push({
    marca: autoAzar.Make_Name,
    modelo: autoAzar.Model_Name
  })

  await fs.writeFile('db.json', JSON.stringify(db), 'utf-8')

  res.send('Auto al azar generado')
});

app.listen(3000, () => {
  console.log('servidor ejecutando');
})

// https://www.biobiochile.cl/categorias/internacional?nombre=Matias&apellido=Bensan