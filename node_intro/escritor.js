//import fs from 'fs';
const fs = require('fs').promises;

// node escritor.js nombre_archivo extension mensaje

if (process.argv.length < 5) {
  console.log('Este programa requiere 5 argumentos');
  process.exit(1);
}

const nombre_archivo = `temporales/${process.argv[2]}.${process.argv[3]}`
const mensaje = process.argv[4]

async function escribirLeer() {
  await fs.writeFile(nombre_archivo, mensaje, 'UTF-8')
  console.log('Archivo exitosamente creado');

  const contenido = await fs.readFile(nombre_archivo, 'utf8');
  console.log(contenido.toUpperCase())
}
escribirLeer()



