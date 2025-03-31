const validator = require("validator")

const validateSignUpData = (req)=>{
const{firstName,lastName,emailId,password} = req.body;
if(!firstName || !lastName){
    throw new Error("Name is not valid");
}else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid");
}else if(!validator.isStrongPassword(password)){
    throw new Error("password is not strong");
}

}
const validateUpdateData = (req)=>{
    const allowedFlields = [
        "firstName",
        "lastName",
        "password",
        "age",
        "gender",
        "emailId",
        "photoUrl",
        "about",
        "skills",
      ];
      const isEditAllowed = Object.keys(req.body).every((field)=>
    allowedFlields.includes(field));
      return isEditAllowed;
}

module.exports = {
validateSignUpData,
validateUpdateData
}