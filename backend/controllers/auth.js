const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");



const register= async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        
        const existingUser= await User.findOne({
            $or:[{email},{username}],
        });
        if(existingUser)
        {
            return res.status(409).json({
                success:false,
                message:"User Already Exist!",
            })
        }


        const HashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
                username,
                email,
                password:HashedPassword,
        });

        res.status(201).json({
            success:true,
            message:"Registration Successfull !",
        });

    }
    catch (err){
        res.status(500).json({
            success:false,
        });s

    }
}



const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: email },
                { username: username },
            ]
        });

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!",
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            message: "Login Successful!",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
// LOGOUT
const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({
        success: true,
        message: "Logged out successfully!",
    });
};

// GET CURRENT USER
const getMe = async (req, res) => {
    try {
        const user = await User
            .findById(req.user.userId)
            .select("-password");
        res.json({
            success: true,
            user,
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports={register,login,logout,getMe};