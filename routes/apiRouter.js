const express =require ("express");
const apiController =require ("../controllers/apiController");
const router = express.Router();
router.post("/update/userProfile", apiController.updateUserProfile);

module.exports =  router
