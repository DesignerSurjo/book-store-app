import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized, Login Again" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role !== 'admin') {
      return res.json({ success: false, message: "Not Authorized, Admin Only" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Token verification failed" });
  }
};

// const adminAuth = async(req,res,next) => {
//   try {
//       const {token} = req.headers
//       if (!token) {
//           return res.json({ success: false, message: "Not Authorized Login Again" })
//       } 
//       const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//       if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//           return res.json({ success: false, message: "Not Authorized Login Again" })
//       }
//       next()
//   } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: error.message })

//   }
// }


export default adminAuth;
