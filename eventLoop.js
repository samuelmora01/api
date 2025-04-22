/* Node.js se basa en un único hilo para ejecutar código JavaScript. Pero gracias al event loop, puede delegar tareas pesadas o lentas a otros hilos del sistema (como el sistema de archivos o red), y luego espera a que esas tareas "respondan" para continuar. */
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

Promise.resolve().then(() => {
    console.log('3');
});

console.log('4');
