const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()
let router = require('./api/routes');
let cors = require('cors');

app.use(cors());

app.use(bodyParser.json());



// Connect to Mongoose
// mongoose.connect(process.env.DB);
// var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /locate');
});

app.use('/api', router);

app.listen(4000);
console.log('Running on port 4000...');
