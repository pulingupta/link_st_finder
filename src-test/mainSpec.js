const expect = require("chai").expect;
const main = require('../src/main')

describe("Get Most Suitable Link Station", function () {
    it("returns valid message when valid input is given", function () {
        const deviceLocation = {latitude : 3, longitude : 4}
        expect(main.getMostSuitableStation(deviceLocation)).to.equal("Best link station for point 3,4 is 0,0 with power 25 and reach 10");
    })
    it("returns valid message when valid input is given", function () {
        const deviceLocation = {latitude : 20, longitude : 24}
        expect(main.getMostSuitableStation(deviceLocation)).to.equal("Best link station for point 20,24 is 20,20 with power 1 and reach 5");
    })
    it("returns valid message when string is provided", function () {
        const deviceLocation = {latitude : 30, longitude : "50"}
        expect(main.getMostSuitableStation(deviceLocation)).to.equal("No link station within reach for point 30,50");
    })
    it("returns invalid message when any invalid coordinate like string is inserted", function () {
        const deviceLocation = {latitude : 30, longitude : "a"}
        expect(main.getMostSuitableStation(deviceLocation)).to.equal("Entered cordinates 30 or a are invalid, please provide valid numbers");
    })
})