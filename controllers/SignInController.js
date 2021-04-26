const data =require ("../models/schemas/Data.js");

const SignInController ={
    getSignIn:(req, res) => {
        res.render("SignIn.ejs");
    }
}

module.exports =  SignInController;