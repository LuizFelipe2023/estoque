import express from 'express'
import stockController from '../controllers/stockController.js'
import authController from '../controllers/authController.js'
import userController from '../controllers/userController.js'

const router = express.Router();

router.post('/stock', authController.verifyToken, stockController.createProduct);
router.get('/stock', authController.verifyToken, stockController.getAllProducts);
router.get('/stock/:id', authController.verifyToken, stockController.getProductById);
router.put('/stock/:id', authController.verifyToken, stockController.updateProduct);
router.delete('/stock/:id', authController.verifyToken, stockController.deleteProduct);

router.post('/register', userController.register);
router.post('/login', authController.login);
router.post('/reset-password', userController.resetPassword);
router.post('/logout',authController.logout);
router.get('/users',authController.verifyToken,userController.getAllUsers);

export default router;