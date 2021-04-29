module.exports = {
    getSignOut:(req,res)=>{
        req.session.destroy((error)=>{
          res.redirect('/');
        });
    }  
};

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

