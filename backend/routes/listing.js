    const express=require("express");
    const router=express.Router();
    const {
        getAllListings,
        getListing,
        createListing,
        updateListing,
        deleteListing,
    } = require("../controllers/listing");



 const {isLoggedIn} = require("../middleware/auth");
const { upload } = require("../config/cloudinary");

    router.get("/", getAllListings);
    router.get("/:id", getListing);



    router.post("/", isLoggedIn,upload.single("image"), createListing);
    router.put("/:id", isLoggedIn,upload.single("image"), updateListing);
    router.delete("/:id", isLoggedIn, deleteListing);


    module.exports=router;  