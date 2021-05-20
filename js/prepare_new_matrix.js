const { execSync, exec } = require("child_process");
const matrix = require("./run_matrix");
const getPid = require("./get_pid");
const killPid = require("./kill_pid");
let currPID;

async function runMatrix() {
  if (currPID == null) {
    console.log("Running Matrix from NULL")
    matrix.runMatrix();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Getting PID from NULL. Currently: " + currPID)
    currPID = getPid.getPID();
    console.log("Got PID. New PID: " + currPID);
  } else {
    console.log("Killing PID. PID to Kill: " + currPID);
    killPid.killPID(currPID);
    console.log("PID: " + currPID + " Killed")
    console.log("Running Matrix")
    matrix.runMatrix();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Getting PID. Currently: " + currPID)
    currPID = getPid.getPID();
    console.log("Got PID. New PID: " + currPID);

  }
}

exports.runMatrix = runMatrix;
