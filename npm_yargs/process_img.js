const Jimp = require('jimp')


const archivo = process.argv[2]

async function procesar() {
  const imagen = await Jimp.read(archivo)
  await imagen.resize(400, Jimp.AUTO).sepia().writeAsync('imgs/newImg.jpg')
  console.log('Imagen procesada');
}

procesar()