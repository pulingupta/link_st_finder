const expect = require("chai").expect;
const rewire = require('rewire'),
    powerFinder = rewire('../src/calculatepower');

describe("validate station data", function () {
    it("returns false when any reach is invalid string", function () {
        const linkStation = [1,2,'f']
        const validateLinkStationData = powerFinder.__get__('validateLinkStationData')
        const isValid = validateLinkStationData(linkStation)
        expect(isValid).to.equal(false);
    });
    it("returns true when any reach is valid number", function () {
        const linkStation = [1,2,4]
        const validateLinkStationData = powerFinder.__get__('validateLinkStationData')
        const isValid = validateLinkStationData(linkStation)
        expect(isValid).to.equal(true);
    });
    it("returns false when any reach is null", function () {
        const linkStation = [1,2,null]
        const validateLinkStationData = powerFinder.__get__('validateLinkStationData')
        const isValid = validateLinkStationData(linkStation)
        expect(isValid).to.equal(false);
    });
    it("returns false when any reach is undefined", function () {
        const linkStation = [1,2,undefined]
        const validateLinkStationData = powerFinder.__get__('validateLinkStationData')
        const isValid = validateLinkStationData(linkStation)
        expect(isValid).to.equal(false);
    });
});

describe("Link Station Power Finder", function() {
    it("returns right power value as per logic for function calcPower", function () {
        const calcPower = powerFinder.__get__('calcPower')
        const power = calcPower(10, 5)
        expect(power.power).to.equal(25);
    })
    it("returns right power value as per logic for function findStationPower", function () {
        const findStationPower = powerFinder.__get__('findStationPower')
        const power = findStationPower(10, 5)
        expect(power.power).to.equal(25);
    })
    it("returns right power value as per logic for distance greater than reach", function () {
        const findStationPower = powerFinder.__get__('findStationPower')
        const power = findStationPower(5, 10)
        expect(power.power).to.equal(0);
    })
})

describe("Link Station Distance Calculation", function() {
    it("returns correct distance with valid input", function () {
        const sampleLinkStation = [0,0,10]
        const deviceLocation = {latitude : 3, longitude: 4}
        const getLinkStationObj = powerFinder.__get__('getLinkStationObj')
        const calcDistance = powerFinder.__get__('calcDistance')
        const distance = calcDistance(getLinkStationObj(sampleLinkStation), deviceLocation)
        expect(distance).to.equal(5);
    })
    it("returns correct distance with invalid input", function () {
        const sampleLinkStation = [0,0,null]
        const deviceLocation = {latitude : 3, longitude: 4}
        const getLinkStationObj = powerFinder.__get__('getLinkStationObj')
        const calcDistance = powerFinder.__get__('calcDistance')
        expect(function(){ calcDistance(getLinkStationObj((sampleLinkStation)), deviceLocation)}).to.throw("Invalid Link Station Entries");
    })
})

describe("Link Station Calculate Max Power", function() {
    it("returns max power", function () {
        const sampleLinkStationList = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];
        const deviceLocation = {latitude: 3, longitude: 4}
        const getMaxPower = powerFinder.getMaxPower
        expect(getMaxPower(sampleLinkStationList, deviceLocation).power).to.equal(25);
    })
    it("not returns max power but throws error with invalid link station input", function () {
        const sampleLinkStationList = [[0, 0, null], [20, 20, 5], [10, 0, 12]];
        const deviceLocation = {latitude: 3, longitude: 4}
        const getMaxPower = powerFinder.getMaxPower
        expect(getMaxPower(sampleLinkStationList, deviceLocation).power).to.equal(15.505814040834812);
    })
})