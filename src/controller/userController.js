const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User')

module.exports = {
    register: (req, res) => {
        return res.render('./user/register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('./user/register', {
                errors: resultValidation.mapped()
            });
        }

        let userInDB = User.findByField('email', req.body.email);

        if (userInDB){
            return res.render('./user/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                }
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
            avatar: req.file ? req.file.filename : 'user_undefined.png'
        }
        User.create(userToCreate);
        res.render('./user/create');
    },

    login: (req, res) => {
        return res.render('user/login');
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('usuario', req.body.usuario);
        if (userToLogin) {
            let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkPassword) {
                delete userToLogin.password;
                delete userToLogin.passwordConfirm;
                req.session.userLogged = userToLogin;
                if (req.body.remember_user) {
                    res.cookie('userCokkie', req.body.usuario, { maxAge: (1000 * 60) * 2})
                }
                return res.redirect('/profile');
            };
            return res.render('user/login', {
                errors: {
                    usuario: {
                        msg: 'Las credenciales no son validas'
                    }
                }
            });
        }

        return res.render('user/login', {
            errors: {
                usuario: {
                    msg: 'Usuario no registrado'
                }
            }
        });
    },

    profile: (req, res) => {
        return res.render('user/profile', {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('userCokkie')
        req.session.destroy();
        return res.redirect('/');
    }
};
