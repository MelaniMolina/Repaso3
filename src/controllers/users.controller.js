const userCtrl = {};
const User = require('../models/User');
const passport  = require('passport');

userCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

userCtrl.signup = async (req, res) => {
    const errors=[];
    const {name,email,password,confirm_password} = req.body;
    if(password !== confirm_password){
        errors.push({text:'Passwords do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Passwords must be at least 4 characters'});
    }
    if(errors.length > 0){
        res.render('users/signup',{
            errors,
            name,
            email,
            password,
            confirm_password
        })
    }else{
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','The email is already in use ')
            res.render('users/signup');
        }else{
           const newUser = new User({name,email,password});
           newUser.password = await newUser.encryptPassword(password);
           await newUser.save();
           req.flash('success_msg','You are register');
           res.redirect('/users/signin');
        }
    }
};

userCtrl.renderSigninForm = (req,res)=>{
    res.render('users/signin');

};

userCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect:'/notes',
    failureFlash: true
});



userCtrl.logout =(req,res)=> {
    res.send('logout');
};


module.exports = userCtrl;