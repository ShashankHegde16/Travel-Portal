const mongoose = require('mongoose');
const Transaction = mongoose.model('Transactions');
module.exports = (app) => {

    app.get('/api/list', async (req, res) => {
        const { page, limit, sortBy, direction, searchBy, price, bookings } = req.query;
        const sort = sortBy ? { [sortBy]: parseInt(direction) } : {};
        const skip = (page - 1) * limit;
        const match = searchHandler(searchBy, price, bookings);
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
            console.log(e)
            res.status(422).send({ error: "Something went wrong!" });
        }
    });

    app.get('/api/products', async (req, res) => {
        try {
            let response = await Transaction.distinct('product_title');
            response = response.map((product) => {
                return { text: product, key: product, value: product };
            });
            res.status(201).send(response);
        } catch (e) {
            res.status(422).send({ error: "Something went wrong!" });

        }
    });

    function searchHandler(searchKey, price, count) {
        let query = {};

        if (searchKey) {
            query = { ...query, ...{ product_title: searchKey } };
        }
        if (price) {
            query = { ...query, ...{ price: { $gt: Number(price) } } };
        }
        if (count) {
            query = { ...query, ...{ total_booking_count: { $lt: Number(count) } } };
        }
        console.log(query)
        return query

    }

}