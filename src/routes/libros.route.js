import { Router } from 'express';
import fs from 'fs';
const rutasLibros = Router();

const readData = () => {
    try {
        const data = fs.readFileSync('src/libros.json');
        return JSON.parse(data);
    } catch (error) {
        console.error(error.message);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync('src/libros.json', JSON.stringify(data));
    } catch (error) {
        console.error(error.message);
    }
};

rutasLibros
    .route('/')
    .get((req, res) => {
        try {
            const data = readData();

            res.json({ succes: 200, libros: data.libros });
        } catch (error) {
            console.error(error.message);
        }
    })
    .post((req, res) => {
        try {
            const data = readData();
            const newLibro = {
                id: data.libros.length + 1,
                ...req.body,
            };

            data.libros.push(newLibro);

            writeData(data);

            res.json(newLibro);
        } catch (error) {
            console.error(error.message);
        }
    });

rutasLibros
    .route('/:id')
    .put((req, res) => {
        try {
            const data = readData();
            const id = parseInt(req.params.id);

            const libroIndex = data.libros.findIndex((libro) => libro.id == id);

            data.libros[libroIndex] = {
                ...req.body,
            };

            writeData(data);

            res.json({ message: 'Libro actualizado' });
        } catch (error) {
            console.error(error.message);
        }
    })

    .get((req, res) => {
        try {
            const data = readData();
            const id = parseInt(req.params.id);

            const libroIndex = data.libros.findIndex((libro) => libro.id == id);

            const libro = data.libros[libroIndex];

            res.json(libro);
        } catch (error) {
            console.error(error.message);
        }
    })

    .delete((req, res) => {
        try {
            const data = readData();
            const id = parseInt(req.params.id);

            const libroIndex = data.libros.findIndex((libro) => libro.id == id);

            data.libros.splice(libroIndex, 1);

            writeData(data);

            res.json({ message: 'Libro eliminado' });
        } catch (error) {
            console.error(error.message);
        }
    });
export default rutasLibros;
