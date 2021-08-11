const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser")
app.use(cookieParser());
require('./server/config/mongoose.config'); // This is new
const userRouter = require('./server/routes/instapp.route')
app.use(cors());
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new
app.use('/api',require('./server/routes/authRouter')) //new one 
app.use('/user',userRouter)
app.listen(8000, () => {
console.log("Listening at Port 8000")
})