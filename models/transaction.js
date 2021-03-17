const mongoose = require('mongoose');
const { Schema } = mongoose;

const Transaction = Schema({
    id: Number,
    product_title: String,
    currency: String,
    price: Number,
    total_booking_count: Number,
    destination: String,
    lat_long: [Number],
    segments: [String],
    ota: String,
    created_at: Date
});

mongoose.model('Transactions', Transaction, 'Transactions');