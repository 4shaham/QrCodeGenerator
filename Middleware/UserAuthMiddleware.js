

const userAuthMiddleware=async(req,res,next)=>{

    try {
        
       if(!req.session.loginStatus){
            res.redirect("/api/login")
            return
       }
       next()
    } catch (error) {
        console.log(error)   
    }
}

export default userAuthMiddleware