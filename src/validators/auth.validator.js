
class AuthValidator{
    async validateRegisterRequest(req,res,next){
        try{
            const {email,password} = req.body;
            if(!email){
                res.status(400).json({message:"Email is required"});
            }
            if(!password){
                res.status(400).json({message:"Password is required"});
            }
            next();
        }catch(error){
            res.status(500).json({message:"Internal server error"});
        }
    }
    async validateLoginRequest(req,res,next){
        try{
            const {email,password} = req.body;
            if(!email){
                res.status(400).json({message:"Email is required"});
            }
            if(!password){
                res.status(400).json({message:"Password is required"});
            }
            next();
        }catch(error){
            res.status(500).json({message:"Internal server error"});
        }
    }
}
export default AuthValidator;