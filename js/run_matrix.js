const { exec } = require("child_process");

const options = {
    cwd: '/home/pi/rpi-rgb-led-matrix/examples-api-use'
}

function runMatrix() {
    exec("sudo ./demo -D1 --led-rows=64 --led-cols=64 --led-slowdown-gpio=2 --led-pwm-bits=11 --led-gpio-mapping=adafruit-hat-pwm ../../Desktop/Music_Matrix/images/current_song.ppm", options);
}

exports.runMatrix = runMatrix;
