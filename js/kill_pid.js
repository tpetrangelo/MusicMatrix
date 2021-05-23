const { execSync } = require("child_process");


function killPID(currPID) {
    console.log("Killing pid: " + currPID);
    execSync('sudo kill -9 ' + currPID);
}

exports.killPID = killPID;
