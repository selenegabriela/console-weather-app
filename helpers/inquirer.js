const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad`
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`
      },
    ]
  }
];

const pausaPregunta = [
  {
    type: 'input',
    name: 'enter',
    message: `\nPresione ${'ENTER'.green} para continuar\n`,
  }
]

const inquirerMenu = async() => {

  console.clear();
  console.log('============================='.green);
  console.log('    Seleccione una opción  '.white );
  console.log('=============================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas)
  return opcion;
}

const pausa = async() => {
  
  console.log('\n')
  await inquirer.prompt(pausaPregunta);

}

const leerInput = async(message) => {
  const question = [
    {
      type: 'input',
      name: 'lugar',
      message,
      validate(value){
         if(value.length === 0){
          return 'Por favor ingrese un valor';
         }
         return true;
      }
    }
  ];
  // inquirer regresa un objeto
  const { lugar } = await inquirer.prompt(question);
  return lugar;
}

const listadoLugares = async(lugares) => {
  console.log('\n')
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`
    };
  });
  const opcionCero = {
    value: '0',
    name: `${'0'.green}. Cancelar`
  }
  choices.unshift(opcionCero);
  const listado = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar: ',
      choices
    }
  ];

  const { id }  = await inquirer.prompt(listado);
  return id;
}

const confirmar = async(message) => {
  console.log('\n')

  const confirmarBorrar = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(confirmarBorrar);
  return ok;
}

const mostrarListadoCheckList = async(tareas) => {
  console.log('\n')
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    };
  });

  const listado = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ];

  const { ids }  = await inquirer.prompt(listado);
  return ids;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoLugares,
  confirmar,
  mostrarListadoCheckList
}