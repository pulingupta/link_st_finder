const _ = require('lodash')

exports.getMaxPower = (listOfStations, deviceLocation) => {
    let maxPower = []
    listOfStations.forEach(function(station) {
        try {
            const linkStationObj = getLinkStationObj(station)
            const power = findStationPower(linkStationObj.reach, calcDistance(linkStationObj, deviceLocation))
            maxPower.push(_.extend({}, linkStationObj, power))
        } catch(e){
            console.error(e.message)
        }
    })
    return _.first(_.reverse( _.sortBy(maxPower, o => o.power)))
}

const calcDistance = (linkStation, deviceLocation) => {
    return Math.sqrt((Math.pow((deviceLocation.latitude - linkStation.latitude), 2)) +
        (Math.pow((deviceLocation.longitude - linkStation.longitude), 2)))
}

const findStationPower = (reach, distance) => {
    if(distance > reach) {
        return { power : 0 }
    } else return calcPower(reach, distance )
}

const calcPower = (reach, distance) => {
    const diff = reach - distance;
    return { power : Math.pow(diff, 2) }
}

const getLinkStationObj  = (linkStation) => {
    if(validateLinkStationData(linkStation)){
        return {
            latitude : linkStation[0],
            longitude : linkStation[1],
            reach : linkStation[2]
        }
    } else throw new Error("Invalid Link Station Entries")
}

const validateLinkStationData = (linkStation)  => {
    return !(linkStation.some(item => !_.isNumber(item) || _.isNil(item)))
}