const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

//multer
const fileupload = require('../middleware/multerUserMiddleware.js');

//validar
const validations = require('../middleware/createUserMiddleware.js');

//session / logged / profile
const guestMiddleware = require('../middleware/guestMiddleware.js');
const authMiddleware = require('../middleware/authMiddleware.js');

//registro
router.get("/registro", guestMiddleware, userController.register);
router.post("/registro", fileupload.single('imagenUser'), validations, userController.processRegister);

//login
router.get("/login", guestMiddleware, userController.login);
router.post("/login", userController.loginProcess);

//profile
router.get("/profile", authMiddleware, userController.profile);

//logout
router.get("/logout", userController.logout);


module.exports = router;