const express=require("express");
const router=express.Router({ mergeParams: true });


const{
    addReview,
    deleteReview,
    getReviews,
}=require("../controllers/review");

const { isLoggedIn }=require("../middleware/auth");

router.get("/",getReviews);
router.post("/",isLoggedIn,addReview);
router.delete("/",isLoggedIn,deleteReview);

module.exports= router;