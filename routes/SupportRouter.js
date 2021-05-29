const express =require ("express");
const SupportController =require ("../controllers/SupportController");
const router = express.Router();
router.get("/",SupportController.getSupport);

module.exports =  router
