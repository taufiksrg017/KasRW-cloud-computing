const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { loginValidator, handleValidation } = require('../utils/validators');

router.post('/login', loginValidator, handleValidation, authController.login);
router.get('/me', authMiddleware, authController.me);
router.put('/change-password', authMiddleware, authController.changePassword);

module.exports = router;