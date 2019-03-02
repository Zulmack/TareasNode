const id = {
    id: {
        demand: true,
        alias: 'i',
        desc: 'ID de la tarea a actualizar'
    }
}
const opciones = {
    crear: {
        tarea: {
            demand: true,
            alias: 'd',
            desc: 'Descripcion de la tarea por hacer'
        }
    },
    listar: {},
    actualizar: {
        id,
        completado: {
            alias: 'c',
            default: true,
            desc: 'Completado: true/false'
        }
    },
    borrarDB: {
        sure: {
            demand: false,
            alias: 's',
            default: 'false'
        }
    },
    borrar: {
        id
    }
};
const argv = require('yargs')
    .command('crear', 'Crea una tarea', opciones.crear)
    .command('listar', 'Lista las tareas', opciones.listar)
    .command('actualizar', 'Actualiza una tarea', opciones.actualizar)
    .command('borrarDB', 'Borra la BD', opciones.borrar)
    .command('borrar', 'Borra una tarea', opciones.borrar)
    .help()
    .argv;
module.exports = { argv };