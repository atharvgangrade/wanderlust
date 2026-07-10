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

    router.get("/", getAllListings);
    router.get("/:id", getListing);



    router.post("/", isLoggedIn, createListing);
    router.put("/:id", isLoggedIn, updateListing);
    router.delete("/:id", isLoggedIn, deleteListing);


    module.exports=router;