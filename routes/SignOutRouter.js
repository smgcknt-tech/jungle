const express =require ("express");
const SignOutController = require("../controllers/SignOutController");
const router = express.Router();
router.get('/',SignOutController.getSignOut);
module.exports =  router