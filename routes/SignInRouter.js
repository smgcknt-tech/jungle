const express =require ("express");
const SignInController = require("../controllers/SignInController");
const router = express.Router();
router.get('/',SignInController.getSignIn,);
router.post('/',SignInController.postSignIn,)
module.exports =  router