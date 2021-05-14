const SpotifyWebApi = require("spotify-web-api-node");
const songImage = require("./download_current_song");

var currAlbumURI = "";
var currStatus;
async function getCurrentSong(spotifyApi) {
  let response = await spotifyApi.getMyCurrentPlayingTrack("US");

  if (response.statusCode == 502) {
    var newSpotifyApi = new SpotifyWebApi({
      accessToken: spotifyApi.getAccessToken(),
    });

    await getCurrentSong(newSpotifyApi);
  } else if (response.statusCode != 200) {
    var newSpotifyApi = new SpotifyWebApi({
      accessToken: spotifyApi.getAccessToken(),
    });
    if(currStatus != response.statusCode){
        console.log(response.statusCode);
    }
    currStatus = response.statusCode;
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await getCurrentSong(newSpotifyApi);
  } else {

    if (currAlbumURI != response.body.context.uri){
      console.log("")
      console.log("New Album Playing")
      console.log("------------------------------------")
      console.log("Old Album: " + currAlbumURI);
      console.log("New Album: " + response.body.context.uri);
      console.log("------------------------------------")

      let songURL = response.body.item.album.images[2].url;
      let currentSongID = response.body.item.id;
      await songImage.downloadedSong(songURL);
    } else {
        console.log("");
        console.log("Same Album Playing");
        console.log("------------------------------------");
        console.log("Old ID: " + currAlbumURI);
        console.log("New ID: " + response.body.context.uri);
        console.log("------------------------------------");
    }

    var newSpotifyApi = new SpotifyWebApi({
      accessToken: spotifyApi.getAccessToken(),
    });
    currAlbumURI = response.body.context.uri;
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await getCurrentSong(newSpotifyApi);
  }
}

exports.getCurrentSong = getCurrentSong;
