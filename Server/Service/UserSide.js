
import axios  from "axios";
  
const userHomePage = async (req, res, next) => {
  try {

   
    let data=await axios.get(`http://localhost:${process.env.PORT}/api/findAllVoucher`)
    res.render("home", {vouchers:data.data.vouchers});  

  } catch (error) {  
    next(error);
  }
};

const userLoginPage = async (req, res, next) => {
  try {
    
    if (req.session.loginStatus) {
       res.redirect("/api/");
       return 
    }
    res.render("login", { message:""});
  } catch (error) {
      console.log("err",error)
      next(error)
  }
};



const settingsPage=async(req,res,next)=>{
    try {
      res.render("settingPage")
    } catch (error) {
        next(error)
    }
}


const QrResultPage=async(req,res,next)=>{
  try {

    const id=req.query.id?req.query.id:-1
    let data=await axios.get(`http://localhost:${process.env.PORT}/api/findQrNumber?id=${id}`)
   
    if(data.data.QrData){
       res.render("QrResponse",{status:true,data:data.data.QrData})
    }else{
        res.render("QrResponse",{status:false,data:""})
    }    

  } catch (error) {
     next(error)
  }  
}


  
const service = {
  userHomePage,
  userLoginPage,
  settingsPage,
  QrResultPage
};
  
export default service;  
