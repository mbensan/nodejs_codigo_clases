// Ejemplo de servidor CON Express
// 1. primero importo la librería
const express = require('express');
const axios = require('axios');

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

  // vamos a chequear que el "id" sea positivo
  if (parseInt(id_animal) < 0) {
    return res.end('El ID debe ser un número mayor a 0')
  }

  const animal = animales.find(x => x.id == id_animal)

  if (!animal) {
    return res.send(`No existe un animal para la ID ${id_animal}`)
  }

  res.send(`El animal encontrado es un ${animal.nombre}`)
});

// ejemplo de consulta de API de sismos
app.get('/sismo', async (req, res) => {
  const datos = await axios.get('https://api.gael.cloud/general/public/sismos')
  console.log(datos.data);

  const lugar = datos.data[0].RefGeografica
  const magnitud = datos.data[0].Magnitud
  const fecha = datos.data[0].Fecha.split(' ')[1]

  res.send(`Hubo un sismo de magnitud ${magnitud} en ${lugar} a las ${fecha} <br><br> A JUNTAR AGUA!!!`)
})

function mes_palabra(mes) {
  return [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ][parseInt(mes) - 1]
}

// ejemplo de consulta de API de usuario al azar
app.get('/usuario', async (req, res) => {
  const datos = await axios.get('https://randomuser.me/api/')
  const persona = datos.data.results[0]

  const nombre_completo = `${persona.name.first} ${persona.name.last}`
  let fecha_nac = persona.dob.date.split('T')[0].split('-')
  fecha_nac = `${fecha_nac[2]} de ${mes_palabra(fecha_nac[1])} de ${fecha_nac[0]}`
  
  res.send(`La persona se llama ${nombre_completo} y nació en ${fecha_nac}`);
})

app.get('/usuarios', async (req, res) => {
  const datas = await Promise.all([
    axios.get('https://randomuser.me/api/'),
    axios.get('https://randomuser.me/api/'),
    axios.get('https://randomuser.me/api/')
  ])
  const persona1 = datas[0].data.results[0];
  const persona2 = datas[1].data.results[0];
  const persona3 = datas[2].data.results[0];
  
  console.log(persona1)
  
  res.send(`Las personas son ${persona1.name.first} ${persona1.name.last}, ${persona2.name.first} ${persona2.name.last} y ${persona3.name.first} ${persona3.name.last},`);
})



// 4. Ejecuto el servidor
app.listen(3000, function () {
  console.log('Servidor andando en el puerto 3000');
})