const fs = require('fs');
const fetch = require('node-fetch');
const path = require("path");
const { exec } = require("child_process");
const matrix = require("./prepare_new_matrix");

async function downloadedSong(url) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  try {
    fs.writeFileSync(path.resolve(__dirname, "../../Music_Matrix/images/current_song.jpg"), buffer)
    exec("mogrify -format ppm current_song.jpg", { cwd: '/home/pi/Desktop/Music_Matrix/images/' }, (error, stdout, stderr) => {
      if (error) {
        console.log('error in download_current_song: ' + error.message);
        return;
      }
      if (stderr) {
        console.log('stderr in download_current_song: ' + stderr);
        return;
      }
      matrix.runMatrix();
    });

  } catch (err) {
    console.error(err)
  }
}


exports.downloadedSong = downloadedSong;
