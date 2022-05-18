import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const inputValues: string[] = fs
	.readFileSync(path.resolve(__dirname, fileName))
	.toString()
	.split("\n");

/*
MOVING IN 2D: LEFT/RIGHT (forward), UP/DOWN (depth)
Commands:
  - forward X: INCREASES the horizontal position by X units.
  - down X: INCREASES the depth by X units.
  - up X: DECREASES the depth by X units.

  down = +1 depth
  up = -1 depth

Initial conditions:
  - Horizontal position: 0
  - Depth: 0

RESULT: 
  - result = finalPosition.horizontal * finalPosition.vertical
*/

let forward: number = 0;
let up: number = 0;
let down: number = 0;
inputValues.map((item, index) => {
	if (item.includes("forward")) {
		forward = forward + Number(item.substring(8, 9));
	}
	if (item.includes("up")) {
		up = up + Number(item.substring(3, 4));
	}
	if (item.includes("down")) {
		down = down + Number(item.substring(5, 6));
	}
});

console.log(forward * Math.abs(up-down))
