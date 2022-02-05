// Ejemplo de servidor SIN Express
const http = require('http')
// Lectua pag 5. Revisamos 9:41
// crear una ruta que retorne una pagina web simple
http.createServer(function (req, res) {
  console.log(req.url)
  const url = req.url
  if (url == '/hoy') {
    res.write(`${new Date()}`)
  }
  else if (url == '/saludos') {
    res.write(`Hola!`)
  }
  else if (url == '/pagina') {
    res.write(`
      <html>
        <head>
          <title>Mi página fome</title>
        </head>
        <body>
          <h2>Esta página fué creada con NodeJS</h2>
        </body>
      <html>
    `)
  }

  res.end()
})
.listen(8081, () => console.log('Escuchando el puerto 8081'))
