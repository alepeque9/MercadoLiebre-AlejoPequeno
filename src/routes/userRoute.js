const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');
const multer = require('multer');
const path = require('path');

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        const newFilename = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});
const fileupload = multer({ storage: storage });

//validar
const validations = require('../middleware/createUserMiddleware.js')

router.get("/login", userController.login);
router.get("/registro", userController.registro);
router.post("/registro", fileupload.single('imagenUser'), validations, userController.create);

module.exports = router;