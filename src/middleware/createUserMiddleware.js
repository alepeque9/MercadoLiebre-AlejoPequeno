const { body } = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
    body('usuario').notEmpty().withMessage('El campo usuario es obligatorio'),
    body('email').notEmpty().withMessage('El campo Email es obligatorio').bail().isEmail().withMessage('Debes escribir un Email con el formato valido'),
    body('fecha').notEmpty().withMessage('El campo fecha de nacimiento es obligatorio'),
    body('opciones').notEmpty().withMessage('Debes seleccionar un perfil de usuario'),
    body('intereses').notEmpty().withMessage('Debes seleccionar tus intereses'),
    body('password').notEmpty().withMessage('Campo contraseña obligatorio'),
    body('passwordConfirm').notEmpty().withMessage('Debes confirmar su contraseña'),
]