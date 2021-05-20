const { exec, execSync } = require("child_process");


function killPID(currPID) {
    execSync('sudo kill -INT ' + currPID, (error, stdout, stderr) => {
        if (error) {
            console.log('error in run_matrix (kill pid Section): ' + error.message);
            return;
        }
        if (stderr) {
            console.log('stderr in run_matrix (kill pid Section): ' + stderr);
            return;
        }
    });
}

exports.killPID = killPID;
