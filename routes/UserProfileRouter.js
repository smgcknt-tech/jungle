const express =require ("express");
const UserProfileController =require ("../controllers/UserProfileController");
const router = express.Router();
router.get("/", UserProfileController.getUserProfile);

module.exports =  router
