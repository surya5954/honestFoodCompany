var express = require('express');
var router = express.Router();
const axios = require('axios');
const factoryData = require("../parser/kml2json");
const e = require('express');

router.post('/locate', (req, res) => {
    let location = req.body;
    let address = location.address;
    let userPosition;
    let searchGeoUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${process.env.API_KEY}`;
    console.log(searchGeoUrl);
    axios.get(searchGeoUrl).then((response) => {
        userPosition = response.data.items[0].position;
        return factoryData();
    }).then(data => {
        console.log(data);
        let outlet = findCorrectOutlet(userPosition, data.features);
        if (outlet == null) {
            res.status(200).send({
                response: "Outlet not found !"
            })
        } else {
            res.status(200).send({
                response: "Outlet Found !",
                name: outlet
            });
        }
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({
            response: "Something went wrong ! Please try again later !",
            err: err.message
        });
    })
})


const findCorrectOutlet = (userPostion, outlets) => {
    console.log(userPostion);
    for (let outlet of outlets) {
        let coordinates = outlet.geometry.coordinates;
        // console.log(outlet.geometry.type);
        if (outlet.geometry.type == "Polygon") {
            
            for (let subOut of coordinates[0]) {
                // console.log(subOut);
                if (subOut[0].toString().includes(userPostion.lng) || subOut[1].toString().includes(userPostion.lat)) {
                    return outlet.properties.name;
                }
            }
        } else {
            // console.log(coordinates);
            if (coordinates[0].toString().includes(userPostion.lng) || coordinates[1].toString().includes(userPostion.lat)) {
                return outlet.properties.name;
            }
        }
    }
    return null;
}

module.exports = router;