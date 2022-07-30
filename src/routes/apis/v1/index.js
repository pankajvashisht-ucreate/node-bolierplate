import express from 'express';
import { UserController } from 'controller/apis/v1/';
import { Apiresponse } from 'utils/index.js';
import { cors, setLanguage, UserAuth, AuthSkip } from 'middleware/index.js';
const router = express.Router();
router.use([cors, setLanguage, AuthSkip, UserAuth]);
router.get('/', Apiresponse(UserController.login));
router.post('/user', Apiresponse(UserController.login));
router.post('/user/login', Apiresponse(UserController.login));

export default router;
