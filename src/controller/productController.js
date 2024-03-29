const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const rutaProducto = path.resolve(__dirname, '../database/products.json')
const datos = JSON.parse(fs.readFileSync(rutaProducto));

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
        } else{
            let productoNuevo = {
                "id": datos.length + 1,
                "vendedor": req.params.id,
                "nombreProd": req.body.nombreProducto,
                "precio": parseFloat(req.body.precioProducto),
                "categoriaProducto": req.body.categoriaProducto,
                "descripcionGeneral": req.body.descripcionGeneral,
                "oferta": req.body.oferta,
                "imagenProducto": req.file.filename,
            }
            datos.push(productoNuevo);
            fs.writeFileSync(rutaProducto, JSON.stringify(datos, null, 2), "utf-8");
            res.render('./product/createProduct')
        }
    },
    search: (req, res) => {
        let search = datos.filter((row) => {
            const nombre = (row.nombreProd || '').toString().toLowerCase();
            const categoria = (row.categoriaProducto || '').toString().toLowerCase();
            const desc = (row.descripcionGeneral || '').toString().toLowerCase();

            const query = (req.query.search || '').toString().toLowerCase();

            return nombre.includes(query) || categoria.includes(query) || desc.includes(query);
        });

        return res.render('./product/search', { search: search });
    }
};