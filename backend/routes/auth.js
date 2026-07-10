const express=require("express");
const router=express.Router();
const{
    register,
    login,
    logout,
    getMe
}=require("../controllers/auth");

const { isLoggedIn }=require("../middleware/auth");



router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",isLoggedIn,getMe);

module.exports=router;