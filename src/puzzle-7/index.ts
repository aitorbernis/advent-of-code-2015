import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const inputValues: string[] = fs
	.readFileSync(path.resolve(__dirname, fileName))
	.toString()
	.split("\n");

// manipulate the inputValues to get an array of bingo numbers
const rawBingoNumbers: string = inputValues[0];
let stringArrayNumbers: string[] = rawBingoNumbers.split(",");
const numbersArray: number[] = stringArrayNumbers.map((number) =>
	Number(number)
);

inputValues.splice(0, 2);

// manipulate the inputValues to get the different bingoGroups

inputValues.map((row, index) => {
	if (row.length === 0) {
		inputValues.splice(index, 1);
	}
});

const rawInput: string[] = inputValues;
const a: string[] = rawInput.map((row) => row.replace(/^ /g, ""));
const b: string[] = a.map((row) => row.replace(/ /g, ","));
const c: string[] = b.map((row) => row.replace(/,,/g, ","));
const d: string[][] = c.map((row) => row.split(","));
const rawBingoGroups: number[][] = d.map((row) =>
	row.map((number) => Number(number))
);

let bingoGroups: number[][][] = [];
let group: number[][] = [];

for (let i = 0; i < rawBingoGroups.length; i++) {
	group.push(rawBingoGroups[i]);
	if (group.length === 5) {
		bingoGroups.push(group);
		group = Array(0);
	}
}

// console.log(numbersArray)
// console.log(bingoGroups)

// BINGO

// for each number in numbersArray
const transpose = (bingo: number[][]) => {
	for (let i = 0; i < bingo[0].length; i++) {
		for (let j = 0; j < i; j++) {
			for (let a = 0; a < bingo.length; a++) {
				const tmp = bingo[i][j];
				bingo[i][j] = bingo[j][i];
				bingo[j][i] = tmp;
			}
		}
	}
	return bingo;
};

let bingoCount = 0
numbersArray.map((bingoNumber, bingoNumberIndex) => {
	if (bingoCount === 0) {

		bingoGroups.map((group) => {
			// row
			group.map((row, rowIndex) => {
				if (row.includes(bingoNumber)) {
					row[row.indexOf(bingoNumber)] = -1;
				}
			});
	
			group.map((row, rowIndex) => {
				if (row.every((value) => value === -1)) {
					console.log("BINGO in horizontal");
					console.log(row);
					console.log(group);
					let positiveCount = 0;
					group.map((row) => {
						row.map((number) => {
							if (number !== -1) {
								positiveCount = positiveCount + number;
							}
						});
					});
					console.log("Total count = ", positiveCount);
					console.log(`Code: ${positiveCount * numbersArray[bingoNumberIndex]}`);
					console.log(bingoNumber);
					bingoCount++
				}
			});
	
			for (let i = 0; i < group.length; i++) {
				let count = 0;
				group.map((row, rowIndex) => {
					if (row[i] === -1) {
						count++;
					}
					if (count === 5) {
						console.log("BINGO in vertical");
						console.log(group);
						count = 0;
						let positiveCount = 0;
						group.map((row) => {
							row.map((number) => {
								if (number !== -1) {
									positiveCount = positiveCount + number;
								}
							});
						});
						console.log("Total count = ", positiveCount);
						console.log(
							`Code: ${positiveCount * numbersArray[bingoNumberIndex]}`
						);
						bingoCount++
					}
				});
			}
		});
	}
});
