const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

// Don't need get routes to load pages, that is handled in react (Front End);
// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });

// router.post(
//     "/login",
//     passport.authenticate("local", {
//         successRedirect: "/",
//         failureRedirect: "/auth/login",
//         failureFlash: true,
//         passReqToCallback: true,
//     })
// );

// when using passport for login as an api, you have to change the structure of the login method in order to be able to pass user information to the client.
router.post("/login", (req, res, next) => {
    console.log({ loginBody: req.body });
    passport.authenticate("local", (err, user, failureDetails) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong with database query.",
            });
            return;
        }

        if (!user) {
            console.log({ noUserFound: failureDetails });
            res.status(401).json(failureDetails);
            return;
        }

        req.login(user, (err) => {
            console.log({ user, err });
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Something went wrong with login!" });
            }
            console.log({ reqUser: req.user });
            user.password = undefined;
            res.status(200).json(user);
        });
    })(req, res, next);
});

// Don't need get routes to load pages, that is handled in react (Front End);
// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (email === "" || password === "" || username === "") {
        // res.render("auth/signup", {
        //     message: "Indicate username and password",
        // });
        res.status(400).json({
            message: "Indicate username, email and password",
        });
        return;
    }

    User.findOne({ email }, "email", (err, user) => {
        if (user !== null) {
            // res.render("auth/signup", {
            //     message: "The email already exists",
            // });
            res.status(400).json({ message: "The username already exists" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass,
            email,
        });

        // don't use this method to log in user when using express as an api. Instead use callback method shown below.
        // newUser
        //     .save()
        //     .then(() => {
        //         // res.redirect("/");
        //         req.login();
        //         res.status(200).json(newUser);
        //     })
        //     .catch((err) => {
        //         // res.render("auth/signup", { message: "Something went wrong" });
        //         res.status(400).json({ message: "Something went wrong" });
        //     });

        newUser.save((err) => {
            if (err) {
                res.status(400).json({
                    message: "Saving user to database error",
                });
                return;
            }

            req.login(newUser, (err) => {
                if (err) {
                    res.status(500).json({
                        message: "Login after signup error",
                    });
                    return;
                }
                user.password = undefined;
                res.status(200).json(
                    {
                        message: "Successful login after signup",
                    },
                    req.user
                );
            });
        });
    });
});

router.delete("/logout", (req, res) => {
    req.logout();
    // res.redirect("/");
    res.status(200).json({ message: "Logged Out" });
});

router.get("/isLoggedIn", (req, res) => {
    console.log({ checkingForUser: req.user });
    if (req.user) {
        console.log({ user: req.user });
        req.user.password = undefined;
        res.status(200).json(req.user);
        return;
    }

    res.status(401).json({ message: "Unauthorized Access!" });
});

module.exports = router;
