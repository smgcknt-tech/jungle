const express =require ("express");
const CheckOutController = require("../controllers/CheckOutController");
const c = CheckOutController
const router = express.Router();
router.post('/:id',c.checkOut,);
module.exports =  router