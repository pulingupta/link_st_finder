const coordinates = [[3,4], [100, 100], [15,10], [18, 18]]
const linkStationFinder = require ('./src/main.js')

coordinates.forEach(function(item){
    const singleDeviceLocationCoordinate = {
            latitude : item[0],
            longitude : item[1]
    }
    console.log(linkStationFinder.getMostSuitableStation(singleDeviceLocationCoordinate))
})








