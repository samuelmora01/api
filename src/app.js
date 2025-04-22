import express from 'express';
import rutasLibros from './routes/libros.route.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

// Middleware para manejar JSON (solo una vez es necesario)
app.use(express.json());

// Ruta para los libros
app.use('/api/libros', rutasLibros);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
