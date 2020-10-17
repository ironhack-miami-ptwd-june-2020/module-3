const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// passport.use(new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password'
//   },
//   (username, password, done) => {
//     User.findOne({ username })
//     .then(foundUser => {
//       if (!foundUser) {
//         done(null, false, { message: 'Incorrect username' });
//         return;
//       }

//       if (!bcrypt.compareSync(password, foundUser.password)) {
//         done(null, false, { message: 'Incorrect password' });
//         return;
//       }

//       done(null, foundUser);
//     })
//     .catch(err => done(err));
//   }
// ));

passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: "email",
        },
        (email, password, next) => {
            User.findOne({ email })
                .then((userFromDb) => {
                    if (!userFromDb) {
                        return next(null, false, {
                            message: "Incorrect Email",
                        });
                    }

                    if (!bcrypt.compareSync(password, userFromDb.password)) {
                        return next(null, false, {
                            message: "Incorrect Password",
                        });
                    }

                    return next(null, userFromDb);
                })
                .catch((err) => next(err));
        }
    )
);
