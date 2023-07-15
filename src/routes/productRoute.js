const express = require('express');
const router = express.Router();
const Controller = require('../controller/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const newFilename = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const fileupload = multer({ storage: storage });

//validar
const validations = require('../middleware/createProductMiddleware')


//router
router.get ("/:id/vender", Controller.vender);
router.post("/:id/vender", fileupload.single("imagenProducto"), validations,Controller.publicado);

module.exports = router;