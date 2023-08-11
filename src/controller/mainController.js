let db = require('../database/models')

module.exports = {
    index: (req, res) => {
        db.Products.findAll({
            where: {OFERTA: 1},
            order:[
                ["precio", "ASC"], //ORDENAR POR PRECIO DE FORMA ASCENDENTE O DESC (DESCENDIENTE)
            ],
            limit: 4
        }).then((resultado) => {
            res.render('index', {oferta: resultado, productos: resultado})
        });
    }
}