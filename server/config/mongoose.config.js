const mongoose = require('mongoose');

require('../models/instapp.model');
require('../models/comment.model');
require('../routes/authRouter');
require('../controllers/authCtrl');



mongoose.connect("mongodb://localhost/instapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));