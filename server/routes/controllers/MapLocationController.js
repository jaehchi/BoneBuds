const axios = require('axios');
const Events = require('../../SQL/models/events');

const MapLocationController = {
  getAllEvents: (req, res) => {
    Events.findAll()
      .then((response) =>{
        console.log('Event location data fetched');
        res.send(response);
      })
      .catch((e) => {
        console.log(e, 'Did Not Find Event Data');
        res.status(500);
      })
  },

}

module.exports = MapLocationController;