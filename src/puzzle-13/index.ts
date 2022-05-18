import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const inputValues: number[] = fs
	.readFileSync(path.resolve(__dirname, fileName))
	.toString()
	.split(",")
	.map(Number);

// console.log(inputValues.length);

for (let a = 0; a < 9; a++) {
	let aCount = 0;
	let bCount = 0;
	for (let i = 0; i < inputValues.length; i++) {
		if (i < inputValues.length / 2) {
			aCount += inputValues[i];
		} else {
			bCount += inputValues[i];
		}
	}
	if (aCount > bCount) {
		inputValues.splice(0, inputValues.length / 2);
		// console.log("aCount");
	} else if (bCount > aCount) {
		// console.log("bCount");
		inputValues.splice(inputValues.length / 2, inputValues.length / 2);
	}
}

console.log(inputValues);
