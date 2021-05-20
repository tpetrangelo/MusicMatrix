const { execSync, exec } = require("child_process");
const matrix = require("./run_matrix");
const getPid = require("./get_pid");
const killPid = require("./kill_pid");
let currPID;

async function runMatrix() {
  if (currPID == null) {
    matrix.runMatrix();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    currPID = getPid.getPID();
  } else {
    killPid.killPID(currPID);
    matrix.runMatrix();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    currPID = getPid.getPID();
  }
}

exports.runMatrix = runMatrix;
