const express =require ("express");
const SignUpController = require("../controllers/SignUpController");
const router = express.Router();
router.get('/',SignUpController.getSignUp,);
router.post('/',SignUpController.postSignUp,);
module.exports =  router