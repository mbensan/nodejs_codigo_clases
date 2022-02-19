const express = require('express');
const enviar_email = require('./email.js')
const app = express()

app.use(express.static('static'))

app.get('/email', (req, res) => {
  // acá  tienen que enviar el correo
  const destinatarios = req.query.destinatarios
  const asunto = req.query.asunto
  const contenido = req.query.contenido

  console.log(destinatarios, asunto, contenido);
  
  enviar_email(destinatarios, asunto, contenido)

  res.send('Email enviado')
})


app.listen(3000, () => {
  console.log('servidor ejecutando');
})