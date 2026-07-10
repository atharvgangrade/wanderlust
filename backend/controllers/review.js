const Review = require("../models/review");
const Listing = require("../models/listing");

// Add Review
const addReview = async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const { id } = req.params;

        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing Not Found!",
            });
        }

        const review = await Review.create({
            comment,
            rating,
            listing: id,
            author: req.user.userId,
        });

        listing.reviews.push(review._id);
        await listing.save();

        res.status(201).json({
            success: true,
            review,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Delete Review
const deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;

        const review = await Review.findById(reviewId);

        if(!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found!",
            });
        }

        // Check if user is author
        if(review.author.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized!",
            });
        }

        await Review.findByIdAndDelete(reviewId);

        await Listing.findByIdAndUpdate(
            id,
            { $pull: { reviews: reviewId } }
        );

        res.json({
            success: true,
            message: "Review deleted!",
        });

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
// Get All Reviews of a Listing
const getReviews = async (req, res) => {
    try {
        const { id } = req.params;

        const reviews = await Review.find({ listing: id })
            .populate("author", "username");

        res.json({
            success: true,
            reviews,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    addReview,
    deleteReview,
    getReviews,
};