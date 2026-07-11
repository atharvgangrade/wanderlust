require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// DB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(err));

// API Routes
const listingRouter = require("./routes/listing");
const authRouter = require("./routes/auth");
const reviewRouter = require("./routes/review");
app.get("/", (req, res) => {
    res.redirect("/pages/index.html");
});
app.use("/api/listings", listingRouter);
app.use("/api/auth", authRouter);
app.use("/api/listings/:id/reviews", reviewRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});