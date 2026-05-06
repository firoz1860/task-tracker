import { Router } from 'express';
import { login, signup } from '../controllers/authController';
import { loginValidator, signupValidator } from '../validators/authValidators';
import { validateRequest } from '../middleware/errorMiddleware';

const router = Router();
router.post('/signup', signupValidator, validateRequest, signup);
router.post('/login', loginValidator, validateRequest, login);
export default router;
