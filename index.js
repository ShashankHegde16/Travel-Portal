const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./models/transaction');
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((success) => {
    console.log('Connected to DB!')
}).catch((err) => console.log('Connection Failed....', err))

app.use(bodyParser.json());

require('./routes/transaction')(app);
require('./routes/location')(app);
require('./routes/plots')(app);


if (process.env.NODE_ENV == 'production') {

    app.use(express.static('client-server/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client-server', 'build', 'index.html'));
    })


}

app.listen(PORT, () => {
    console.log('Server Started on Port ' + PORT);
});


