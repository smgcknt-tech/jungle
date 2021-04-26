const express =require ("express");
const SignInController = require("../controllers/SignInController");
const router = express.Router();
router.get('/',SignInController.getSignIn,);

module.exports =  router