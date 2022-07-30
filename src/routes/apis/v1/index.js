import express from 'express';
import Users from 'controller/apis/v1/index.js';
import { Apiresponse } from 'utils/index.js';
import { cors, setLanguage, UserAuth, AuthSkip } from 'middleware/index.js';
const router = express.Router();
router.use([cors, setLanguage, AuthSkip, UserAuth]);
router.get('/', Apiresponse(Users.login));
router.post('/user', Apiresponse(Users.login));
router.post('/user/login', Apiresponse(Users.login));

export default router;
