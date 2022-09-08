const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {
  
  const busquedas = new Busquedas()

  let opt = 0;
  do {
    
    opt = await inquirerMenu();
    
    switch(opt){
      case 1:
        // Mostrar mensaje, para que el usuario introduzca la opción.
        const lugar = await leerInput('Ciudad: ');
        console.log(lugar)
        
        // usuario seleciona opción
        
        //clima
        
        // Mostrar resultados
        
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ');
        console.log('Lat: ');
        console.log('Lng: ');
        console.log('Temperatura: ');
        console.log('Mínima: ');
        console.log('Máxima: ');
        break;
        case 2:
          
          break;
        }
        
        opt !== 0 && await pausa();
      } while(opt !== 0);


    };

main();