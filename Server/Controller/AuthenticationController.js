

import db from "../Config/dbConnection.js";
 
const authenticationController = async (req,res,next) => {  

  try {
    
   
    // Hardcoded username & password
    const validUserName = "shaham";  
    const validPassword = "123456";


    const { userName, password } = req.body;

    // Check if fields are empty
    if (!userName || !password || userName.trim() == "" || password.trim() == "") {
      return res.status(400).json({ message: "UserName and Password are required fields." });
    }

    // Check if username matches
    if (userName !== validUserName) {
      return res.render("login",{message:"Invalid UserName"})  
    }

    // Check if password matches
    if (password !== validPassword) {
      return res.render("login",{message:"Invalid Password"})  
    }

    // Successful login
    req.session.loginStatus=true
    return res.redirect("/api/");
  
      
  } catch (error) {
      next(error)
  }

};
export default authenticationController;


export const logOut=async(req,res)=>{
  try {
    
   req.session.loginStatus=false
   res.redirect("/api/login")

  } catch (error) {
    console.log(error)
  }
}
  