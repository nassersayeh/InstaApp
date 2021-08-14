const mongoose = require('mongoose');

require('../models/userModel');
require('../models/conversationModel');
require('../models/messageModel');
require('../models/notifyModel');
require('../models/postModel');
require('../models/commentModel');
require('../routes/authRouter');
require('../routes/commentRouter');
require('../routes/messageRouter');
require('../routes/notifyRouter');
require('../routes/postRouter');
require('../routes/userRouter');





require('../controllers/authCtrl');
require('../controllers/commentCtrl');
require('../controllers/messageCtrl');
require('../controllers/notifyCtrl');
require('../controllers/postCtrl');
require('../controllers/userCtrl');





mongoose.connect("mongodb://localhost/instapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));