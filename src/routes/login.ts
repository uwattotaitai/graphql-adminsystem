import express from 'express';

import { loginUser } from '../controllers/login';

const router = express.Router();

router.post('/login', loginUser);

export default router;