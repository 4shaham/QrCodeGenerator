

const ErrorHandlingMiddleware=(error,req,res,next)=>{
    const status=err.status
    if(status==404){
        res.render('404Page')
    }else{
        res.render('500Page')
    }
}


export default ErrorHandlingMiddleware