const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const rutaregistro = path.resolve(__dirname, '../database/users.json');
const datos = JSON.parse(fs.readFileSync(rutaregistro));

module.exports = {
    login: (req, res) => {
        return res.render('user/login');
    },

    registro: (req, res) => {
        return res.render('./user/register');
    },

    create: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('./user/register', {
                errors: resultValidation.mapped()
            });
        } else {
            let registroNuevo = {
                "id": datos.length + 1,
                "nombre": req.body.nombre,
                "usuario": req.body.usuario,
                "email": req.body.email,
                "fecha": req.body.fecha,
                "opciones": req.body.opciones,
                "intereses": req.body.intereses,
                "contraseña": bcrypt.hashSync(req.body.password, 10),
                "terminos": req.body.terminos,
                "imagenUser": req.file ? req.file.filename : 'user_undefined.png'
            };
            datos.push(registroNuevo);
            fs.writeFileSync(rutaregistro, JSON.stringify(datos, null, 2), "utf-8");
            res.render('./user/create');
        }
    }
};
