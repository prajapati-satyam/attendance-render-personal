require('dotenv').config();
const Cryptr = require('cryptr');

const validate = (req, res, next) => {
    // console.log(req.body);
    if (req.body.password === process.env.PASSWORD || req.body.password === process.env.PASSWORD2) {
        const cryptr = new Cryptr(process.env.DESKEY, { saltLength: 67 });
        const token = cryptr.encrypt(process.env.COOKIES)
        res.cookie("token", token, {
            maxAge: 300000,
            httpOnly: true,
        });
        res.status(200).json({ redirect: "/view" }); // Send JSON response
    } else {
        res.status(401).json({ mess: "Invalid password" });
    }
}

const cookieCheker = (req, res, next) => {
    if (req.cookies.token) {

        const cryptr = new Cryptr(process.env.DESKEY, { saltLength: 67 });
        const token = cryptr.decrypt(req.cookies.token);
        if (token === process.env.COOKIES) {
            next()
        } else {
            console.log("error here");
            
            res.status(401).json({ mess: "Unauthorized Access" })
        }
    
    } else {
        res.status(401).json({ mess: "You don't have token" })
    }

}


const passwordChekerAndCookieValidator = (req, res, next) => {
   const {password} = req.body;
   try {
    
       const cryptr = new Cryptr(process.env.DESKEY, { saltLength: 67 });
       const token = cryptr.decrypt(req.cookies.token);
       if (password === process.env.API && token === process.env.COOKIES) {
           next();
   } else {
    console.log("Invalid password attmept");
    res.status(400).json({mess: "Invalid password"});
   }
 } 
 catch(err) {
    console.log("error in password and cookie validator");
 res.status(400).json({mess: "something went wrong"})
}
}


module.exports = { validate, cookieCheker , passwordChekerAndCookieValidator}