// Replace line 1 in server.js
require("dotenv").config({ path: "./.env" });
const express=require("express");
const mongoose=require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app=express();
const PORT=process.env.PORT || 8080;


const Lisitng=require("./models/listing")
const ListingRouter=require("./routes/listing");
const authRouter=require("./routes/auth");
const reviewRouter=require("./routes/review");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
}));
console.log("authRouter type:", typeof authRouter);

mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("MONGO DB CONNECTED")
    })
    .catch((err)=>{
        console.log(err);
    })

  

app.get("/",(req,res)=>{
    res.json({message:"wanderlust api is running"});
})

app.use("/api/listings", ListingRouter);
app.use("/api/auth",authRouter);
app.use("/api/listings/:id/reviews",reviewRouter);

 app.listen(PORT ,()=>{
    console.log("Server is Listing");
 })   