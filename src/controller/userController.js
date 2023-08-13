const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

let db = require('../database/models')

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

        db.Users.findOne({
            where: {
                EMAIL: req.body.email
            }
        }).then((emailResult) => {
            if (emailResult) {
                return res.render('./user/register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    }
                });
            } else {
                db.Users.findOne({
                    where: {
                        usuario: req.body.usuario
                    }
                }).then((userResult) => {
                    if (userResult) {
                        return res.render('./user/register', {
                            errors: {
                                usuario: {
                                    msg: 'Este usuario ya existe'
                                }
                            }
                        });
                    } else {
                        if (req.body.password !== req.body.passwordConfirm) {
                            return res.render('./user/register', {
                                errors: {
                                    passwordConfirm: {
                                        msg: 'Ambas contraseñas deben coincidir'
                                    }
                                }
                            });
                        } else {
                            db.Users.create({
                                nombre: req.body.nombre,
                                usuario: req.body.usuario,
                                email: req.body.email,
                                nacimiento: req.body.fecha,
                                intereses: req.body.intereses,
                                password: bcryptjs.hashSync(req.body.password, 10),
                                avatar: req.file ? req.file.filename : 'user_undefined.png'
                            }).then(() => {
                                res.render('./user/create');
                            });
                        }
                    }
                });
            }
        });
    },

    login: (req, res) => {
        return res.render('user/login');
    },

    loginProcess: (req, res) => {
        db.Users.findOne({
            where: {
                usuario: req.body.usuario
            }
        }).then((userToLogin) => {
            if (userToLogin) {
                const isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if (isOkPassword) {
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if (req.body.remember_user) {
                        res.cookie('userCookie', req.body.usuario, { maxAge: (1000 * 60) * 1 });
                    }
                    return res.redirect('/profile');
                }
            }
            return res.render('user/login', {
                errors: {
                    usuario: {
                        msg: 'Las credenciales no son válidas'
                    }
                }
            });
        });
    },

    profile: (req, res) => {
        db.Users.findByPk(req.session.userLogged.id)
            .then(function (user) {
                res.render('user/profile', { user: user })
            })
    },

    logout: (req, res) => {
        res.clearCookie('userCookie');
        req.session.destroy();
        return res.redirect('/');
    }
}
