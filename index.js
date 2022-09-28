require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {
  
  const busquedas = new Busquedas()

  let opt = 0;
  do {
    
    opt = await inquirerMenu();
    
    switch(opt){
      case 1:
        // Mostrar mensaje, para que el usuario introduzca la opción.
        const termino = await leerInput('Ciudad: ');
        // Buscar lugar
        const lugares = await busquedas.ciudad(termino);

        // usuario seleciona lugar
        const id = await listadoLugares(lugares);
        if(id === '0') continue;
        
        const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

        // Guardar en DB

        busquedas.agregarHistorial(lugarSeleccionado.nombre);

        const { nombre, lat, lng } = lugarSeleccionado; 
        //clima
        
        const clima = await busquedas.climaLugar(lat, lng);
        const { desc, min, max, temp} = clima;
        // // Mostrar resultados
        console.clear();
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ', nombre.green);
        console.log('Lat: ', lat);
        console.log('Lng: ', lng);
        console.log('Temperatura: ', temp);
        console.log('Mínima: ', min);
        console.log('Máxima: ', max);
        console.log('Descripción del clima: ', desc.green)
        break;
        case 2:

        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        })
          
        break;
        }
        
        opt !== 0 && await pausa();
      } while(opt !== 0);


    };

main();