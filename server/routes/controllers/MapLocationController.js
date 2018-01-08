const axios = require('axios');
const Events = require('../../SQL/models/events');

const MapLocationController = {
  getAllEvents: (req, res) => {
    Events.findAll()
      .then((response) =>{
        console.log('Event location data fetched')
        console.log('Event long/lat results:', response);
        res.send(response).status(200);
      })
      .catch((e) => {
        console.log(e, 'Did Not Find Event Data');
        res.status(500);
      })
  },
  getLocationLatLong: (req, res) => {
    const query = req.body.query;
    const swapped = query.replace(/\s/g, '+');

    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + swapped + '&key=AIzaSyBsL7VlcbDZTbz2CvN6moCFIQOR27U1t6s')
      .then((response) => {
        res.send(response.data.results[0]).status(200)
      })
      .catch((e)=> {
        console.log('Not able to fetch api data for latLong', e)
        res.status(500);
      })
  }
}

module.exports = MapLocationController;