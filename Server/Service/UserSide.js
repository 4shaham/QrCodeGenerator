
import axios  from "axios";
  
const userHomePage = async (req, res, next) => {
  try {

   
    let data=await axios.get(`http://localhost:4005/api/findAllVoucher`)
    res.render("home", {vouchers:data.data.vouchers});  

  } catch (error) {  
    next(error);
  }
};

const userLoginPage = async (req, res, next) => {
  try {
    if (req.session.loginStatus) {
      return res.redirect("/api/");
    }
    res.render("login", { message:""});
  } catch (error) {
      console.log("err",error)
  }
};



const settingsPage=async(req,res,next)=>{
    try {
      res.render("settingPage")
    } catch (error) {
        next(error)
    }
}



const service = {
  userHomePage,
  userLoginPage,
  settingsPage,
};
  
export default service;
