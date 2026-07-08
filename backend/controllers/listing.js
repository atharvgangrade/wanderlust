const Listing = require("../models/listing");

const getAllListings= async(req,res)=>{
    try{
        const listing=await Listing.find();
        res.json({
            success:true,
            listing,
        });
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
        })
    }

}


const getListing= async(req,res)=>{
    try{
        const listing= await Listing.findById(req.params.id);
        if(!listing)
        {
            return res.status(404).json({
                success:false,

            })
        }
        res.json({
            success:true,
            listing,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,

        })
    }
}
const createListing = async (req, res) => {
    try {
        const { title, description, image,
                price, location, country } = req.body;
        const listing = await Listing.create({
            title,
            description,
            image,
            price,
            location,
            country,
        });
        res.status(201).json({
            success: true,
            listing,
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(
            req.params.id,
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
};

// DELETE LISTING
const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if(!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found!",
            });
        }
        res.json({
            success: true,
            message: "Listing deleted!",
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};




module.exports={
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing,
};