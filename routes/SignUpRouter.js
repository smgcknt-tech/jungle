const express =require ("express");
const SignUpController = require("../controllers/SignUpController");
const router = express.Router();
const s = SignUpController
router.get('/',s.getSignUp,);
router.post('/',s.duplicationCheck,s.emptyCheck,s.postSignUp);
module.exports =  router