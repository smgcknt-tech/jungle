const express =require ("express");
const SignUpController = require("../controllers/SignUpController");
const router = express.Router();
const s = SignUpController
router.get('/',s.getSignUp,);
router.get('/:id',s.getSignUpWithCart,);
router.post('/',s.duplicationCheck,s.emptyCheck,s.postSignUp);
router.post('/:id',s.duplicationCheck,s.emptyCheck,s.postSignUpWithCart);
module.exports =  router