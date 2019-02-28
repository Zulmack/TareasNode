const fs = require('fs');
const colors = require('colors')
const fileName = './db/data.json';

let listadoPorHacer = [];

const guardarDB = () => {
    return new Promise((resolve, reject) => {

        let data = JSON.stringify(listadoPorHacer);
        fs.writeFile(fileName, data, (err) => {
            if (err) reject(err);
            else resolve(fileName);
        });

    });
}
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (e) {
        listadoPorHacer = [];
        console.log('error', JSON.stringify(e).red);
    }
}
const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        id: listadoPorHacer.length + 1,
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB().then((response) => {
        console.log(response);
    }, (err) => {
        console.log(err);
    });
    return porHacer;
}
const obtenerTarea = (id) => {
    for (var i = 0; i < listadoPorHacer.length; i++) {
        if (listadoPorHacer[i].id === id) {
            return i;
        }
    }
    return -1;
}
const modificar = (id, completado = true) => {
    cargarDB();
    listadoPorHacer[obtenerTarea(id)].completado = completado;
    console.log('MODIFICADO', listadoPorHacer);
    guardarDB();
}
const borrar = (id) => {
    cargarDB();
    listadoPorHacer = listadoPorHacer.filter(tarea => {
        return tarea.id !== id;
    });
    guardarDB();
    return listadoPorHacer;
}
const listar = () => {
    cargarDB();
    return listadoPorHacer;
}
const borrarDB = () => {
    fs.exists(fileName, (exists) => {
        if (!exists) console.log('File does not exist.');
        else {
            fs.unlink(fileName, (err) => {
                if (err) console.log(err);
                else console.log('File deleted');
            });
        }

    })
}
module.exports = { crear, modificar, listar, borrarDB, borrar };