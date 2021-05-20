const { execSync } = require("child_process");

function getPID() {
    return execSync("pidof -s demo");
}
exports.getPID = getPID;
