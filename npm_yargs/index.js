const yargs = require('yargs')
const child = require('child_process');


yargs.command(
  'saludar',
  'Este comando sirve para saludar a las personas',
  {
    nombre: {
      describe: 'Opción para definir el nombre de la persona',
      demand: true,
      alias: 'n'
    }
  },
  function (args) {
    console.log(`Hola ${args.nombre}, cómo estás?`);
  }
).help().argv

yargs.command(
  'ping',
  "Este comando devuelve un número de PONG's",
  {
    num: {
      describe: 'El número de PONGs a devolver',
      demand: true,
      alias: 'n'
    }
  },
  function (args) {
    for (let i=0; i<args.num; i++) {
      console.log(`PONG ${i+1}`);
    }
  }
).help().argv

yargs.command(
  'retoque',
  "Este comando nos sirve para retocar una fotografía",
  {
    foto: {
      describe: 'El archivo fotográfico que vamos a retocar',
      demand: true,
      alias: 'f'
    }
  },
  function (args) {
    const archivo = args.foto;
    // primero recuperamos la extension del archivo, y la
    // pasamos a minúsculas
    let extension = archivo.split('.')
    extension = extension[extension.length - 1].toLowerCase()

    const extensiones_validas = ['jpg', 'png', 'jpeg', 'gif']

    // verificamos que la extension del archivo sea una de las extensiones válidas
    if (!extensiones_validas.includes(extension)) {
      console.log(`La extensión del archivo "${archivo}" no es válida`);
      return
    }

    // si llegamos acá, entonces estamos listos para editar la imagen
    child.exec(`node process_img.js ${archivo}`, (err, out) => {
      console.log(out);
    })

  }
).help().argv