const express =require ("express");
const CheckOutController = require("../controllers/CheckOutController");
const router = express.Router();
router.get('/:id',CheckOutController.getCheckOut,);
module.exports =  router