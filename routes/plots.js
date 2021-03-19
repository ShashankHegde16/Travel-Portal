const mongoose = require('mongoose');
const Transaction = mongoose.model('Transactions');
const _ = require('lodash')

const NAME_CONFIG = {
    'price': 'Price',
    'total_booking_count': 'Bookings Count'
}
module.exports = (app) => {
    app.get('/api/plot', async (req, res) => {
        const { key } = req.query;
        const response = await Transaction.aggregate([
            {
                $group: {
                    _id: { $substr: ['$created_at', 8, 2] },
                    amount: { $sum: '$' + key }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        const data = _.map(response, 'amount');
        const series = Object.assign({ name: NAME_CONFIG[key], data });
        const optiondata = _.map(response, '_id'); // map  date wise
        res.send({ [key]: { data: optiondata, series } });

    });
}