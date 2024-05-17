const {User, Role} = require('../models');
const md5 = require('md5');
const passport = require('passport');

module.exports.renderRegistrationForm = async function(req, res){
    let roles = await Role.findAll();
    roles.pop();
    roles.pop();
    res.render('users/register', {roles});
}

module.exports.register = async function(req, res){
    if(req.body.role === 7){
        res.redirect('/register')
        return
    } else {
        await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: md5(req.body.password),
            role_id: req.body.role
        });
    }
    res.redirect('/login')
}

module.exports.renderLogin = function(req,res){
    res.render('users/login');
}

module.exports.login = passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login',
    failureMessage: true
})

module.exports.logout = function(req, res){
    req.logout();
    res.redirect('/login');
}

module.exports.renderProfileForm = async function(req,res){
    const user1 = await User.findByPk(req.params.id);
    res.render('users/profile', {user1});
}