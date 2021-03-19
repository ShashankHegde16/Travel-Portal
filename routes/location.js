const mongoose = require('mongoose');
const Transaction = mongoose.model('Transactions');

module.exports = (app) => {
    app.get('/api/aggregate', async (req, res) => {


        const { key, type } = req.query;
        const accumulator = { ['$' + type]: '$' + key };

        const query = {
            "$group": {
                _id: { coordinates: '$lat_long' },

            }
        };
        query["$group"]['amount'] = accumulator;



        try {
            let response = await Transaction.aggregate([query]);
            response = response.map(({ _id: { coordinates }, amount }) => {
                const elem = Object.assign({}, {
                    lat: coordinates[0],
                    lng: coordinates[1],
                    amount

                });
                return elem;
            });
            res.status(201).send(response);
        } catch (e) {
            res.status(422).send({ error: "Something went wrong!" });
        }

    });

    app.get('/api/latlng', async (req, res) => {
        try {
            const query = {
                $group:
                {
                    _id: null,
                    minLatLng: { $min: "$lat_long" },
                    maxLatLng: { $max: "$lat_long" }
                }
            }
            let [response] = await Transaction.aggregate([query]);
            delete response._id;

            response['minLatLng'] = { lat: response['minLatLng'][0], lng: response['minLatLng'][1] };
            response['maxLatLng'] = { lat: response['maxLatLng'][0], lng: response['maxLatLng'][1] };

            res.send(response);

        } catch (e) {
            res.status(422).send('Error in db connection!')
        }
    });

    app.get('/api/coordinates', async (req, res) => {
        try {
            let response = await Transaction.aggregate([
                {
                    $group: { _id: { coordinates: '$lat_long' } }
                }
            ]);
            response = response.map(({ _id: { coordinates } }) => {
                const elem = Object.assign({}, {
                    lat: coordinates[0],
                    lng: coordinates[1]
                });
                return elem;
            });
            res.status(201).send(response);
        } catch (e) {
            res.status(422).send({ error: "Something went wrong!" });
        }
    });

}