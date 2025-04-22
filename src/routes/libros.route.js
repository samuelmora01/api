import { Router } from 'express';
import fs from 'fs';

// Se crea un enrutador para las rutas de libros
const rutasLibros = Router();

// Función para leer el archivo de datos
const readData = () => {
    try {
        const data = fs.readFileSync('src/libros.json');
        return JSON.parse(data);
    } catch (error) {
        console.error(error.message);
        throw new Error('Error al leer los datos');
    }
};

// Función para escribir los datos en el archivo
const writeData = (data) => {
    try {
        fs.writeFileSync('src/libros.json', JSON.stringify(data));
    } catch (error) {
        console.error(error.message);
        throw new Error('Error al escribir los datos');
    }
};

// Ruta para obtener todos los libros
rutasLibros.route('/').get((req, res) => {
    try {
        const data = readData();
        if (data && data.libros && data.libros.length > 0) {
            res.json({ success: true, libros: data.libros });
        } else {
            res.status(404).json({ message: 'No se encontraron libros' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
})
// Ruta para agregar un nuevo libro
.post((req, res) => {
    try {
        const data = readData();
        const newLibro = {
            id: data.libros.length + 1,
            ...req.body,
        };

        data.libros.push(newLibro);
        writeData(data);

        res.status(201).json(newLibro);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al agregar el libro' });
    }
});

// Ruta para manejar libros por ID
rutasLibros.route('/:id')
.get((req, res) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);

        // Buscar el libro por ID
        const libro = data.libros.find(libro => libro.id === id);
        
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
})
.put((req, res) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);

        const libroIndex = data.libros.findIndex((libro) => libro.id === id);
        
        if (libroIndex === -1) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        // Actualizar el libro
        data.libros[libroIndex] = {
            id,
            ...req.body,
        };

        writeData(data);
        res.json({ message: 'Libro actualizado' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
})
.delete((req, res) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);

        const libroIndex = data.libros.findIndex((libro) => libro.id === id);

        if (libroIndex === -1) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        // Eliminar el libro
        data.libros.splice(libroIndex, 1);
        writeData(data);

        res.json({ message: 'Libro eliminado' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
});

export default rutasLibros;
