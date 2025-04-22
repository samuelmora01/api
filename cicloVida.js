/* El ciclo de vida de una aplicación en Node.js comienza cuando ejecutas el archivo principal (por ejemplo, node app.js), donde se cargan los módulos requeridos y se ejecuta el código de forma sincrónica; si hay operaciones asíncronas (como servidores, timers o lecturas de archivos), Node entra en el event loop, que mantiene viva la aplicación hasta que no haya más tareas pendientes, momento en el cual el proceso finaliza. */

console.log('Inicio');
setTimeout(() => console.log('Asíncrono'), 1000);
console.log('Fin');
