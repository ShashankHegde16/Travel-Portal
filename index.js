const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
require('./models/transaction');
const PORT = process.env.PORT || 5000;


mongoose.connect(`${config.MONGODB_URI}`, {
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



app.listen(PORT, () => {
    console.log('Server Started on Port ' + PORT);
});


