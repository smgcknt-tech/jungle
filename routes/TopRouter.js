const express =require ("express");
const TopController =require ("../controllers/TopController");
const router = express.Router();
router.get("/", TopController.getTop);

module.exports =  router
