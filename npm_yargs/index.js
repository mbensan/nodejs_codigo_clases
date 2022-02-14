const yargs = require('yargs')

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