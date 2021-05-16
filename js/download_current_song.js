const fs = require('fs');
const fetch = require('node-fetch');
const path = require("path");

async function downloadedSong(url) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  try {
    const data = fs.writeFileSync(path.resolve(__dirname, "../../Music_Matrix/images/current_song.jpg"), buffer)
  } catch (err) {
    console.error(err)
  }
}


exports.downloadedSong = downloadedSong;
