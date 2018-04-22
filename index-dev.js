const prompt = require ('prompt')
const schema = {
    properties: {
        latitude: {
            description: 'Type device coordinate x',
        },
        longitude: {
            description: 'Type device coordinate y',

        }
    }
};
prompt.start();

prompt.get(schema, function (err, result) {
    console.log(linkStationFinder.getMostSuitableStation(result))
    prompt.stop();
});

const linkStationFinder = require ('./src/main.js')
