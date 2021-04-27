const User = require('../models/schemas/UserModels.js')

const SignUpController = {
    getSignUp:(req,res)=>{
          res.render('SignUp.ejs');
    },
    postSignUp:async (req,res)=> {
        const userName = req.body.userName;
        const email = req.body.email;
        const password =req.body.password;
        const user = await User.create({
            isAdmin: false,
            name: userName,
            email: email,
            password: password,
        });
        res.redirect('/');
    }
};

module.exports = SignUpController;