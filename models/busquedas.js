
const fs = require('fs');
const axios = require('axios');

class Busquedas {

  historial = [ ];
  dbPath = './db/database.json';

  constructor(){
    this.leerDB();
  }

  get paramsBox(){
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }
  
  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: 'es',
      units: 'metric'
    }
  }

  async ciudad( lugar = '' ) {

    
    try {

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsBox,
      });
      
      const respuesta = await instance.get();

      return respuesta.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
      }))
    } catch (error) {
      return error;
    }
  }

  async climaLugar(lat, lon) {
    try {
      // instance axios.create()
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: {...this.paramsWeather, lat, lon}
      });

      const respuesta = await instance.get();

      const { temp_min, temp_max, temp } = respuesta.data.main;

      return {
        desc: respuesta.data.weather[0].description,
        min: temp_min,
        max: temp_max,
        temp
      }
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial( lugar = '' ) {
    const existe = this.historial.find(lugarArreglo => lugarArreglo === lugar);

    this.historial = this.historial.splice(0, 5);

    !existe && this.historial.unshift(lugar);

    this.guardarDB();
  }

  guardarDB(){
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  };

  leerDB(){
    if(!fs.existsSync(this.dbPath)) return null;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'});
    const data = JSON.parse(info);
    this.historial = data.historial;
  }
}

module.exports = Busquedas;