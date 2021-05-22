module.exports = {
    getSignOut:(req,res)=>{
        req.session.destroy((error)=>{
          res.redirect('/');
        });
    }  
};


