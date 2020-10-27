const passport = require('passport');

require('./local-strategy.config');
require('./serializers.config');

module.exports = app => {
  app.use(passport.initialize()); // this "fires" the passport package
  app.use(passport.session()); // connects passport to sessions
};
