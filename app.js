const argv = require('./config/yargs').argv;

const porHacer = require('./por-hacer/por-hacer');

const mostrarListado = (listado) => {
    console.log('LISTADO'.red);
    for (let tarea of listado) {
        console.log('====== Por Hacer ====='.green);
        console.log(`ID: ${tarea.id}`);
        console.log(`Descripción: ${tarea.descripcion}`);
        console.log(`Estado: ${tarea.completado ? 'Sí': 'No'}`);
        console.log('======================'.green);
    }
}
const comando = argv._[0];
let listado = []
switch ((comando + '').toLowerCase()) {
    case 'crear':
        let tarea = porHacer.crear(argv.d);
        console.log('Tarea creada', tarea);
        break;

    case 'listar':
        listado = porHacer.listar();
        mostrarListado(listado);
        break;

    case 'actualizar':
        porHacer.modificar(argv.id, argv.completado === 'true');
        break;


    case 'borrar':
        listado = porHacer.borrar(argv.id);
        mostrarListado(listado)
        break;
    case 'borrarDB':
        console.log('SURE', argv.sure);
        argv.sure === 'Si' ? porHacer.borrarDB() : console.log('Nothing happened. Are you sure?');
        break;

    default:
        console.log(`'${comando}' No es un comando reconocido`);
        break;
}