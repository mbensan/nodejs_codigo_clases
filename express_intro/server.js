// Ejemplo de servidor CON Express
// 1. primero importo la librería
const express = require('express');

// 2. creo la aplicación, y la dejo en la variable 'app'
const app = express()

// 3. Configuro la carpeta de archivos estáticos
app.use(express.static('static'))

const animales = [
  {
    id: '1',
    nombre: 'Jirafa'
  },
  {
    id: '2',
    nombre: 'Orca'
  },
  {
    id: '3',
    nombre: 'Puercoespín'
  }
]

// 3. Defino las rutas
app.get('/', function (req, res) {
  res.send('Hola desde Express');
})

app.get('/tiempo', (req, res) => {
  res.send(`${new Date()}`)
});

app.get('/params', (req, res) => {
  console.log(req.query)
  res.send('Parametros leidos')
});
// Ejemplo de uso de parámetros de la URL
app.get('/animal', (req, res) => {
  let id_animal = req.query.id;
  if (!id_animal) {
    return res.send('Falta la ID del animal')
  }
  const animal = animales.find(x => x.id == id_animal)

  if (!animal) {
    return res.send(`No existe un animal para la ID ${id_animal}`)
  }

  res.send(`El animal encontrado es un ${animal.nombre}`)
});



// 4. Ejecuto el servidor
app.listen(3000, function () {
  console.log('Servidor andando en el puerto 3000');
})