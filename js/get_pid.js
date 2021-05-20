const { exec } = require("child_process");

function getPID() {
    console.log("Inside getPID");
    exec("pidof -s demo", (error, stdout, stderr) => {
        if (error) {
            console.log('error in run_matrix (pidof Section): ' + error.message);
            return;
        }
        if (stderr) {
            console.log('stderr in run_matrix (pidof Section): ' + stderr);
            return;
        }
        console.log(stdout);
        currPID = stdout
        return currPID;
    });
}
exports.getPID = getPID;
