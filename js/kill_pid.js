const { execSync } = require("child_process");


function killPID(currPID) {
    execSync('sudo kill -INT ' + currPID);
}

exports.killPID = killPID;
