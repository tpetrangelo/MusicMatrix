const { execSync } = require("child_process");

function getPID() {
    console.log("Getting pid");
    return execSync("pidof -s demo").toString();
}
exports.getPID = getPID;
