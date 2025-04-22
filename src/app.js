import express from 'express';
import rutasLibros from './routes/libros.route.js';  // Asegúrate de que esta ruta esté bien configurada

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/libros', rutasLibros);  // Esta es la ruta base para libros

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
