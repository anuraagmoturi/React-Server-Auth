const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//we don't want session created by passport as we are using jwt
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false})

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there'});
  });

  app.post('/signup', Authentication.signup);

  app.post('/signin', requireSignin, Authentication.signin);
};