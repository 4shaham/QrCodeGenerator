

import db from "../Config/dbConnection.js";
 
const authenticationController = async (req,res,next) => {  

  try {
    
    await db.user2.create({Name:"sahaha",Email:"shahamsalam123@gmail.com"});
    let data= await db.user2.findAll()
    // const {getVoucher}=Model  
    // let data=await getVoucher()

    console.log(data,"shaham User DAta")
   
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
      return res.status(401).json({ message: "Invalid UserName." });
    }

    // Check if password matches
    if (password !== validPassword) {
      return res.render("login",{message:"Invalid Password"})  
      return res.status(401).json({ message: "Invalid Password." });
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
  