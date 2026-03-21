import jwt from "jsonwebtoken";
class jwt {
    async jwtEncrypt(payload){
        try{
            return await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})
        }catch(error){
            throw error;
        }
    }
    async jwtDecrypt(payload){
        try{
            return await jwt.verify(token,process.env.JWT_SECRET)
        }catch(error){
            throw error;
        }
    }
   
}
export default jwt;