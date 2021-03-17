const mongoose = require('mongoose');
const Transaction = mongoose.model('Transactions');
module.exports = (app) => {



    app.get('/api/list', async (req, res) => {
        const { page, limit, sortBy, direction, searchTerm } = req.query;
        const sort = sortBy ? { [sortBy]: parseInt(direction) } : {};
        const skip = (page - 1) * limit;
        const match = searchTerm ? { product_title: searchTerm } : {};

        try {
            const response = await Transaction.aggregate([
                { $match: match },
                { $sort: sort },
                { $skip: parseInt(skip) },
                { $limit: parseInt(limit) },
                { $project: { "lat_long": 0, "segments": 0, "ota": 0 } }]);
            const count = await Transaction.count(match);
            res.status(201).send({ data: response, records: count });
        } catch (e) {
            res.status(422).send({ error: "Something went wrong!" });
        }
    });

    app.get('/api/products', async (req, res) => {
        try {
            let response = await Transaction.distinct('product_title');
            response = response.map((product) => {
                return { name: product, key: 'product_title', value: product };
            });
            res.status(201).send(response);
        } catch (e) {
            res.status(422).send({ error: "Something went wrong!" });

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
    })
}