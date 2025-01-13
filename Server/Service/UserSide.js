

  
const userHomePage = async (req, res, next) => {
  try {
    if (!req.session.loginStatus) {
       return res.redirect("/api/login");
    }
    res.render("home", { data: "hiiii" });
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
    throw error;
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
