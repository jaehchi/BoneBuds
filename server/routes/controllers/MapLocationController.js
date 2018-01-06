const axios = require('axios');
const Events = require('../../SQL/models/events');

const MapLocationController = {
  GetEventLocation: (req, res) => {
    Events.findAll({ attributes: ['longitude', 'latitude'] })
      .then((response) =>{
        console.log('Event location data fetched')
        console.log('Event long/lat results:', response);
        res.send(response).status(200);
      })
      .catch((e) => {
        console.log(e, 'Did Not Find Event Data')
      })
  }
}

module.exports = MapLocationController;