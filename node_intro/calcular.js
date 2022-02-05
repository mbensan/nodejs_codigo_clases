// Ejemplo de un programa que llama a otros programas
const child_process = require('child_process')

let primer;
let segundo;

console.log(process.argv)

child_process.exec('node uno.js', function (err, result) {
  primer = Number(result);
  child_process.exec('node dos.js', function(err, result2) {
    segundo = Number(result2);
    
    console.log(primer + segundo);
  })
})