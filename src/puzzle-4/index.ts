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
  - forward X: INCREASES the horizontal position by X units & INCREASES the depth by your aim multiplied by X
  (horizontal = horizontal + X) (depth = aim * X)
  - down X: INCREASES the aim by X units.
  - up X: DECREASES the aim by X units.

  down = +1 aim
  up = -1 aim

Initial conditions:
  - Horizontal position: 0
  - Depth: 0

RESULT: 
  - result = finalPosition.horizontal * finalPosition.vertical
*/

let forward: number = 0;
let depth: number = 0;
let aim: number = 0;
inputValues.map((item, index) => {
	if (item.includes("forward")) {
		forward = forward + Number(item.substring(8, 9));
		depth = depth + aim * Number(item.substring(8, 9));
	}
	if (item.includes("up")) {
		aim = aim - Number(item.substring(3, 4));
	}
	if (item.includes("down")) {
		aim = aim + Number(item.substring(5, 6));
	}
});

console.log(forward * depth);
