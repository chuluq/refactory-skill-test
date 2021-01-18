const axios = require('axios');
const UserServices = require('./userInfoService');
const config = require('../config');
let token = null;

function callback(req, res) {
  const body = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: req.query.code,
  };

  const options = { headers: { accept: 'application/json' } };

  axios
    .post(`${config.oauthUrl}/access_token`, body, options)
    .then((res) => res.data['access_token'])
    .then((_token) => {
      console.log('My token: ', token);
      token = _token;
      const user = UserServices.getUserInfo(token);
      res.json({
        data: {
          login: user.login,
          githubId: user.id,
          avatar: user.avatar_url,
          email: user.email,
          name: user.name,
          location: user.location,
        },
      });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
}

module.exports = callback;
