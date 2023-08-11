const { validationResult } = require('express-validator');

let db = require('../database/models')

module.exports = {
    vender: (req, res) => {
        return res.render('./product/vender');
    },

    publicado: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('./product/vender', {
                errors: resultValidation.mapped()
            });
        }

        db.Products.create({
            vendedor: req.params.id,
            nombre_prod: req.body.nombreProducto,
            precio: parseFloat(req.body.precioProducto),
            categoria: req.body.categoriaProducto,
            descripcion: req.body.descripcionGeneral,
            oferta: req.body.oferta,
            imagen: req.file.filename
        });
        res.render('./product/createProduct');
    },
    search: (req, res) => {
        const searchQuery = req.query.search;
        console.log(searchQuery)

        db.Products.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('nombre_prod')), 'LIKE', `%${searchQuery.toLowerCase()}%`),
                    db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('categoria')), 'LIKE', `%${searchQuery.toLowerCase()}%`),
                    db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('descripcion')), 'LIKE', `%${searchQuery.toLowerCase()}%`)
                ]
            }
        })
            .then((products) => {
                res.render('./product/search', { search: products });
            })
    }
};