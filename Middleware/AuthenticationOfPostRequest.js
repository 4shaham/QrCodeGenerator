
 const AuthenticationMiddlewarePost=(req,res,next)=>{
    try {
        
        if(!req.session.loginStatus){
            res.json({message:"Credential Error"})
            return
       }

       next()

    } catch (error) {
        console.log(error)
    }
}

export default AuthenticationMiddlewarePost