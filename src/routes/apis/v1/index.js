import express from 'express';
import Users from 'controller/apis/v1/index.js';
import { Apiresponse } from 'utils/index.js';
import { cors, setLanguage, UserAuth } from 'middleware/index.js';
const router = express.Router();
router.use([cors, setLanguage, UserAuth]);
router.get('/', Apiresponse(Users.login));
router.post('/user', Apiresponse(Users.login));

export default router;
