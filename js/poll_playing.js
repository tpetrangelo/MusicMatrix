const SpotifyWebApi = require("spotify-web-api-node");
const songImage = require("./download_current_song");
const runMatrix = require("./run_matrix");

var currAlbumURI = "";
var currStatus;

async function getCurrentSong(spotifyApi) {
  let response = await spotifyApi.getMyCurrentPlayingTrack("US");

  if (response.statusCode == 502) {
    console.log(response.statusCode);

    await new Promise((resolve) => setTimeout(resolve, 7500));
    getCurrentSong(spotifyApi);
  } else if (response.statusCode != 200) {

    if (currStatus != response.statusCode) {
      console.log(response.statusCode);
    }
    currStatus = response.statusCode;
    await new Promise((resolve) => setTimeout(resolve, 7500));
    getCurrentSong(spotifyApi);     
  } else {


    if (currAlbumURI != response.body.item.uri) {
     /* console.log("")
      console.log("New Album Playing")
      console.log("------------------------------------")
      console.log("Old Album: " + currAlbumURI);
      console.log("New Album: " + response.body.item.uri);
      console.log("------------------------------------")*/

      let songURL = response.body.item.album.images[2].url;
      songImage.downloadedSong(songURL);

    }
     /* else {
      console.log("");
      console.log("Same Album Playing");
      console.log("------------------------------------");
      console.log("Old ID: " + currAlbumURI);
      console.log("New ID: " + response.body.item.uri);
      console.log("------------------------------------");
      }*/
      
    currAlbumURI = response.body.item.uri;
    await new Promise((resolve) => setTimeout(resolve, 7500));
    getCurrentSong(spotifyApi);
  }
}

exports.getCurrentSong = getCurrentSong;
