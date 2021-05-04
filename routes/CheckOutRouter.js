const express =require ("express");
const CheckOutController = require("../controllers/CheckOutController");
const c = CheckOutController
const router = express.Router();
router.get('/:id',c.getCheckOut,);
module.exports =  router