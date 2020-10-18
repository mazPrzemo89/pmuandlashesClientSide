const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const nocache = require('nocache')
require('dotenv').config()
// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const photoRoutes = require('./routes/photo')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const bookingRoutes = require('./routes/bookings')
const bookingTimesRoutes = require('./routes/bookingTimes')
const monthRoutes = require('./routes/month')
const daysRoutes = require('./routes/days')
const smsRoutes = require('./routes/sms')
const promotionRoutes = require('./routes/promotion')
const stripeRoutes = require('./routes/stripe')
const aboutRoutes = require('./routes/about')
mongoose.set('useFindAndModify', false);
//app
const app = express()


//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("DB Connected")
})

// middlewares
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}))
app.use(cookieParser())
app.use(expressValidator())
app.use(nocache())
// routes middlewre
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', categoryRoutes)
app.use('/', productRoutes)
app.use('/', bookingRoutes)
app.use('/', bookingTimesRoutes)
app.use('/', monthRoutes)
app.use('/', daysRoutes)
app.use('/', smsRoutes)
app.use('/', photoRoutes)
app.use('/', promotionRoutes)
app.use('/', stripeRoutes)
app.use('/', aboutRoutes)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
const port = process.env.PORT || 'pmuandlashes.studio'

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})
