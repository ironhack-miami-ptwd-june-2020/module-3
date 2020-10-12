const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Don't need get routes to load pages, that is handled in react (Front End);
// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true,
        passReqToCallback: true,
    })
);

// Don't need get routes to load pages, that is handled in react (Front End);
// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
        // res.render("auth/signup", {
        //     message: "Indicate username and password",
        // });
        res.status(400).json({ message: "Indicate username and password" });
        return;
    }

    User.findOne({ username }, "username", (err, user) => {
        if (user !== null) {
            // res.render("auth/signup", {
            //     message: "The username already exists",
            // });
            res.status(400).json({ message: "The username already exists" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass,
        });

        newUser
            .save()
            .then(() => {
                // res.redirect("/");
                req.login();
                res.status(200).json(newUser);
            })
            .catch((err) => {
                // res.render("auth/signup", { message: "Something went wrong" });
                res.status(400).json({ message: "Something went wrong" });
            });
    });
});

router.delete("/logout", (req, res) => {
    req.logout();
    // res.redirect("/");
    res.status(200).json({ message: "Logged Out" });
});

module.exports = router;
