const jwt =require("jsonwebtoken");

const isLoggedIn=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(401).json(
            {
                success:false,
                message:"Please login First ",
            });
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(501).json({
            success:false,
        })
    }
}
module.exports={isLoggedIn};