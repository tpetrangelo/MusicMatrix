const { exec } = require("child_process");

const options = {
    cwd: '/home/pi/rpi-rgb-led-matrix/examples-api-use'
}

function runMatrix() {
    exec("sudo ./demo -D1 --led-rows=64 --led-cols=64 --led-slowdown-gpio=4 ../../Desktop/Music_Matrix/images/current_song.ppm", options);
}

exports.runMatrix = runMatrix;
