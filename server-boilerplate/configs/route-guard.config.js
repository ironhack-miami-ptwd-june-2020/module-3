// module.exports = (req, res, next) => {
//   if (req.user) next();
//   else res.status(401).json({ message: 'Login first!' });
// };

module.exports = (req, res, next) => {
  // req.isAuthenticated() method is available thanks to passport

  //   if (req.isAuthenticated()) next();
  //   else res.status(401).json({ message: 'Login first!' });

  req.isAuthenticated() ? next() : res.status(401).json({ message: 'Login first!' });
};
