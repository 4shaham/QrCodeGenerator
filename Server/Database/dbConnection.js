import sql from "mssql"




   
  // SQL Server configuration
  const config ={
    user:"kts",
    password:"123456",
    server :"LAPTOP-D34KFEHF",
    database :"master",
    options: {
        trusteServerCertificate:true,  
        trustedConnection: false, 
        enableArithAort: true,
        instancename:"SQLEXPRESS04", 
        encrypt:false,    
    },
    port:1433
  }

   // Connect to SQL Server
export const poolPromise=sql.connect(config)
   .then(() => console.log("Connection Successful!"))
   .catch(err => console.error("Connection Error: ", err));  

   


