const User = require('../models/schemas/UserModels.js')

const SignUpController = {
    getSignUp:(req,res)=>{
          res.render('SignUp.ejs');
    },
    postSignUp:async (req,res)=> {
        const userName = req.body.userName;
        const email = req.body.email;
        const password =req.body.password;
        const user = await new User({
            isAdmin: false,
            name: userName,
            email: email,
            password: password,
        });
        await user.save()
        req.session.userId = user._id;
        req.session.userName = userName;
        res.redirect('/');
    }
};

module.exports = SignUpController;