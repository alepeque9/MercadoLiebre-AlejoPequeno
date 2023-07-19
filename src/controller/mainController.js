const fs = require ('fs');
const path = require ('path');
const datos = JSON.parse(fs.readFileSync (path.resolve(__dirname,'../database/products.json')));

module.exports = {
    index: (req, res) => {
        const oferta = datos.filter((row) => row.oferta == "si");
        const productos = datos.slice(-4);
        return res.render('index', {oferta: oferta, productos: productos});
    }
}