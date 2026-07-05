const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const Listing=require("../models/listing")

router.get("/", async(req,res)=>{
    try{
        const listing=await Listing.find();
        res.json({
            success:true,
            listing,
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
        })
        console.log(err);
    }
})



router.get("/:id" ,async(req,res)=>{
    try{
        const id=req.params.id;
        const listing=await Listing.findById(id);
        if(!listing)
        {
            return res.status(404).json({
                success:false,
                message:"Listing Not Found",
            });
        }
        res.status(200).json({
            success:true,
            listing,
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:true,
        })
    }

})

router.post("/", async(req,res)=>{
    try{
        const{title,description,image,price,location,country}=req.body;
        
        const newListing=new Listing({
            title,
            description,
            image,
            price,
            location,
            country,
        });

        await newListing.save();
        res.status(200).json({
            sucess:true,
            listing:newListing,
        })
    }
    catch(err){
        res.status(500).json({
            sucess:false,
        })
    }   
})

// UPDATE listing
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const listing = await Listing.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        
        if(!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found!",
            });
        }
        
        res.json({
            success: true,
            listing,
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// DELETE listing
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const listing = await Listing.findByIdAndDelete(id);
        
        if(!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found!",
            });
        }
        
        res.json({
            success: true,
            message: "Listing deleted successfully!",
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports=router;



