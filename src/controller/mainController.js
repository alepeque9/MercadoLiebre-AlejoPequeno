const fs = require ('fs');
const path = require ('path');
// const datos = JSON.parse(fs.readFileSync (path.resolve(__dirname,'../database/products.json')));

module.exports = {
    index: (req, res) => {
        // const oferta = datos.filter((row) => row.oferta == true);
        // return res.render('index', {oferta: oferta});
        return res.render('index');

    }
}