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
        const { title, description,
                price, location, country } = req.body;
            const image = req.file ? req.file.path :
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b";

        const listing = await Listing.create({
            title,
            description,
            image,
            price,
            location,
            country,
            owner: req.user.userId, // ← add owner!
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
        const listing = await Listing.findById(req.params.id);
        
        if(!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found!",
            });
        }

        // Check if user is owner
        if(listing.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized!",
            });
        }
          if(req.file) {
            req.body.image = req.file.path;
        }
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            listing: updatedListing,
        });

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};// DELETE LISTING
const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if(!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found!",
            });
        }

        // Check if user is owner
        if(listing.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized!",
            });
        }

        await Listing.findByIdAndDelete(req.params.id);

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

module.exports = {
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing,
};  