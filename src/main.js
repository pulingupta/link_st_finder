const prompt = require('prompt');
const _ = require('lodash');
const power = require('./calculatepower')

exports.getMostSuitableStation = (deviceLocation) => {
    try {
        if(validateDeviceLocationCoordinate(deviceLocation)) {
            const stationPower = power.getMaxPower(getAllStations(), deviceLocation)
            return displayMostSuitableStation(stationPower, deviceLocation)
        } else return `Entered cordinates ${deviceLocation.latitude} or ${deviceLocation.longitude} are invalid, please provide valid numbers`
    } catch(e){
        console.error(e.message)
    }
}

const displayMostSuitableStation = (stationPower, deviceLocation) => {
    if(stationPower.power > 0) return  `Best link station for point ${deviceLocation.latitude},${deviceLocation.longitude} is ${stationPower.latitude},${stationPower.longitude} with power ${stationPower.power} and reach ${stationPower.reach}`
    else return `No link station within reach for point ${deviceLocation.latitude},${deviceLocation.longitude}`
}

const validateDeviceLocationCoordinate = (deviceLocation) => {
    return !_.isNaN(_.parseInt(deviceLocation.latitude)) && !_.isNaN(_.parseInt(deviceLocation.longitude))
}

const getAllStations = () => {
    return [[0, 0, 10], [20, 20, 5], [10, 0, 12]];

}

