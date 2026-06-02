import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
    try{
        
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({
      message: "token not found",
    });
  }

  const decode = jwt.verify(token, process.env.secret_key);

  req.user = decode;
  next();
    }catch(error){
        res.status(400).json({
            message:"invalide token",
        });}
    };

    export default AuthMiddleware;
