//call modules
const express = require('express');
const app = express();

const path = require('path');

//statics => css / js / images
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

//server
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
})

//pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'))
});
//registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'))
});
//login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'))
});