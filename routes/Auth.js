const express = require('express');
const { createUser, loginUser} = require('../controller/Auth');
// const passport = require('passport');

//  /auth is already added in base path
const router = express.Router();
router.post('/signup', createUser)
.post('/login',loginUser)
exports.router = router;
// .get('/check',passport.authenticate('jwt'), checkAuth)
// .get('/logout', logout)
// .post('/reset-password-request', resetPasswordRequest)
// .post('/reset-password', resetPassword)
