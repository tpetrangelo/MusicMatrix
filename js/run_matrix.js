const { exec } = require("child_process");


function runMatrix() {
    console.log("Inside runMatrix")
    exec("sudo ./demo -D1 --led-rows=64 --led-cols=64 --led-slowdown-gpio=4 ../../Desktop/Music_Matrix/images/current_song.ppm", { cwd: '/home/pi/rpi-rgb-led-matrix/examples-api-use' }, (error, stdout, stderr) => {
        if (error) {
            console.log('error in run_matrix (NULL Check Section): ' + error.message);

        }
        if (stderr) {
            console.log('stderr in run_matrix (NULL Check Section): ' + stderr);

        }
        if (stdout) {
            console.log('stdout in run_matrix (NULL Check Section): ' + stdout);

        }
    });
}

exports.runMatrix = runMatrix;
