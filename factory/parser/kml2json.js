const convert = require('parse-kml');
const path = require("path");

let xml = path.join(__dirname, '../assets/FullStackTest_DeliveryAreas.kml');
let factoryData;

module.exports = (async function () {
    factoryData = await convert.toJson(xml)
    return factoryData;
});




