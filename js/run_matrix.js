const { execSync, exec } = require("child_process");
let currPID;

async function runMatrix() {
  if (currPID == null) {
    exec("sudo ./demo -D1 --led-rows=64 --led-cols=64 --led-slowdown-gpio=4 ../../Desktop/Music_Matrix/images/current_song.ppm", { cwd: '/home/pi/rpi-rgb-led-matrix/examples-api-use' }, (error, stdout, stderr) => {
      if (error) {
        console.log('error in run_matrix (NULL Check Section): ' + error.message);
        return;
      }
      if (stderr) {
        console.log('stderr in run_matrix (NULL Check Section): ' + stderr);
        return;
      }
      if (stdout) {
        console.log('stdout in run_matrix (NULL Check Section): ' + stdout);
        return;
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    exec("pidof -s demo", (error, stdout, stderr) => {
      if (error) {
        console.log('error in run_matrix (pidof Section): ' + error.message);
        return;
      }
      if (stderr) {
        console.log('stderr in run_matrix (pidof Section): ' + stderr);
        return;
      }
      currPID = stdout;
      console.log("PID: " + stdout);
    });
  } else {
    console.log("currPID: " + currPID);
    exec('sudo kill -INT ' + currPID, (error, stdout, stderr) => {
      if (error) {
        console.log('error in run_matrix (kill pid Section): ' + error.message);
        return;
      }
      if (stderr) {
        console.log('stderr in run_matrix (kill pid Section): ' + stderr);
        return;
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    exec("sudo ./demo -D1 --led-rows=64 --led-cols=64 --led-slowdown-gpio=4 ../../Desktop/Music_Matrix/images/current_song.ppm", { cwd: '/home/pi/rpi-rgb-led-matrix/examples-api-use' }, (error, stdout, stderr) => {
      if (error) {
        console.log('error in run_matrix (run new Image Section): ' + error.message);
        return;
      }
      if (stderr) {
        console.log('stderr in run_matrix (run new Image Section): ' + stderr);
        return;
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    exec("pidof -s demo", (error, stdout, stderr) => {
      if (error) {
        console.log('error in run_matrix (pidof Section): ' + error.message);
        return;
      }
      if (stderr) {
        console.log('stderr in run_matrix (pidof Section): ' + stderr);
        return;
      }
      currPID = stdout;
      console.log("PID: " + stdout);
    });
  }
}






exports.runMatrix = runMatrix;
