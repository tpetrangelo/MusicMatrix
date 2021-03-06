const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const currentSong = require("./js/poll_playing");

const scopes = ["user-read-currently-playing"];

const spotifyApi = new SpotifyWebApi({
  redirectUri: "http://" + process.env.localIP + ":5000/callback",
  clientId: process.env.clientID,
  clientSecret: process.env.clientSecret,
});

const app = express();

app.use(express.static(__dirname));


app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
  res.redirect('back');

  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );


      currentSong.getCurrentSong(spotifyApi);

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        spotifyApi.setAccessToken(access_token);
        currentSong.getCurrentSong(spotifyApi)

      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    })
})



app.listen(5000, '0.0.0.0', () =>
  console.log(
    "HTTP Server up. Listening to port 5000."
  )
);
