const express = require('express');
const router = express.Router();
const Controller = require('../controller/productController');

//multer
const fileupload = require('../middleware/multerProductMiddleware');

//validar
const validations = require('../middleware/createProductMiddleware');

//router
router.get ("/:id/vender", Controller.vender);
router.post("/:id/vender", fileupload.single("imagenProducto"), validations,Controller.publicado);

router.get("/search", Controller.search);

module.exports = router;