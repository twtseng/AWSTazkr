const passport = require("passport");

const {google,twitter,facebook,github} = require('../controllers/oauth.controller');

const googleAuth = passport.authenticate("google", {scope:["profile"]});
const twitterAuth = passport.authenticate("twitter");
const facebookAuth = passport.authenticate("facebook");
const githubAuth = passport.authenticate("github");

const addSocketIdtoSession = (req,res,next) => {
    req.session.socketId = req.query.socketId;
    next();
}

module.exports = app => {
    app.get('/auth/google', addSocketIdtoSession, googleAuth);
    app.get('/auth/twitter', addSocketIdtoSession, twitterAuth);
    app.get('/auth/facebook', addSocketIdtoSession, facebookAuth);
    app.get('/auth/github', addSocketIdtoSession, githubAuth);

    app.get('/auth/google/callback', googleAuth, google);
    app.get('/auth/twitter/callback', twitterAuth, twitter);
    app.get('/auth/facebook/callback', facebookAuth, facebook);
    app.get('/auth/github/callback', githubAuth, github);

    app.get('/auth/logout', (req,res) => {
        req.session.destroy(err => {
            console.log(err); 
        })
        const io = req.app.get('io');
        io.emit('logout',"hello world");
    });
}