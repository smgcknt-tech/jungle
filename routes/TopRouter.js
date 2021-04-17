const express =require ("express");
const TopController =require ("../controllers/TopController.js");
const router = express.Router();
router.get("/", TopController.getTop);

module.exports =  router
