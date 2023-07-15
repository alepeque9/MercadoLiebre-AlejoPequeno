//call modules
//call modules
const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session = require ('express-session');

//call routes
const mainRoute = require("./routes/mainRoute");
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

//port
const port = 4000;

//database
app.use(express.json());

//form
app.use(express.urlencoded({ extended: false}));

//session
app.use (session ({
    secret: "mensaje secreto",
    resave : false,
    saveUninitialized:false,
}));

//template engines
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

//statics => css / js / images
app.use(express.static("public"));

//Method Override
app.use(methodOverride("_method"))

//server
app.listen(process.env.PORT || port, () => {
    console.log('Levantando servidor http://localhost:' + port)
})

//routes
app.use(mainRoute);
app.use(userRoute);
app.use(productRoute);

//404
app.use((req, res, next) => {
    res.status(404).render('./404/404');
});