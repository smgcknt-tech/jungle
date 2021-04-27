const SignOutController = {
    getSignOut:(req,res)=>{
        req.session.destroy((error)=>{
          res.redirect('/');
        });
    }  
};

module.exports = SignOutController;