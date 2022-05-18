import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const diagnosticReport: string[] = fs
	.readFileSync(path.resolve(__dirname, fileName))
	.toString()
	.split("\n");

/*

From the given binary code we get the GAMMA AND EPSILON RATE

RESULT = TRANSLATED (gammaRate + epsilonRate)

gammaRate = most common bit in each column
(12 numbers in real, 5 in test)
epsilonRate = inverted gammaRate

*/

let gammaRateBinary: number[] = Array(diagnosticReport[0].length).fill(0);
let gammaRateDecimal = 0;

let epsilonRateBinary: number[] = Array(diagnosticReport[0].length).fill(0);
let epsilonRateDecimal = 0;

diagnosticReport.map((code) => {
	for (let i = 0; i < code.length; i++) {
		if (code[i] === "0") gammaRateBinary[i] = gammaRateBinary[i] - 1;
		if (code[i] === "1") gammaRateBinary[i] = gammaRateBinary[i] + 1;
	}
});

gammaRateBinary.map((value, index) => {
	value > 0 ? (gammaRateBinary[index] = 1) : (gammaRateBinary[index] = 0);
	gammaRateDecimal =
		gammaRateDecimal +
		gammaRateBinary[index] * Math.pow(2, gammaRateBinary.length - 1 - index);
});

gammaRateBinary.map((value, index) => {
	value === 0 ? (epsilonRateBinary[index] = 1) : (epsilonRateBinary[index] = 0);
	epsilonRateDecimal =
		epsilonRateDecimal +
		epsilonRateBinary[index] * Math.pow(2, gammaRateBinary.length - 1 - index);
});

console.log(epsilonRateDecimal * gammaRateDecimal);
