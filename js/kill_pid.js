const { execSync } = require("child_process");


function killPID(currPID) {
    console.log("Killing pid: " + currPID);
    execSync('sudo kill -INT ' + currPID);
}

exports.killPID = killPID;
