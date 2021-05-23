const fs = require('fs');
const fetch = require('node-fetch');
const path = require("path");
const { exec, execSync } = require("child_process");
const matrix = require("./prepare_new_matrix");

const options = {

    cwd: '/home/pi/Desktop/Music_Matrix/java/'

};

async function downloadedSong(url) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  try {
    fs.writeFileSync(path.resolve(__dirname, "../../Music_Matrix/images/current_song.png"), buffer)
      console.log("Processing Image"); 
   // execSync('java -jar ../java/Pixelize.jar', options); 
    exec("mogrify -format ppm current_song.png", { cwd: '/home/pi/Desktop/Music_Matrix/images/' }, (error, stdout, stderr) => {
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
