const { execSync, exec } = require("child_process");
const matrix = require("./run_matrix");
const getPid = require("./get_pid");
const killPid = require("./kill_pid");
let currPID;

async function runMatrix() {
  if (currPID == null) {
    console.log("Before runMatrix");
    matrix.runMatrix();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("After runMatrix");
    console.log("Before getPID");
    currPID = getPid.getPID();
    console.log("After getPID");
    console.log("NULL-->New PID:" + currPID);
  } else {
    killPid.killPID(currPID);

    matrix.runMatrix();

    currPID = getPid.getPID();
  }
}

exports.runMatrix = runMatrix;
