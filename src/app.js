import express from 'express';
import rutasLibros from './routes/libros.route.js';
const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.json())
app.use(express.json());

app.use('/api/libros', rutasLibros);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
