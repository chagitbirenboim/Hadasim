require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// api routes
// app.use('/users', require('./users/users.controller'));
require('./routes/api')(app);

const url = 'mongodb://localhost:27017/korona-member';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        console.log('Connected to MongoDB'
        ))
    .catch((err) => 
        console.error('Could not connect to MongoDB', err
    ));

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
