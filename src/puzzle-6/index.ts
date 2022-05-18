import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const rawCodes: string[] = fs
	.readFileSync(path.resolve(__dirname, fileName))
	.toString()
	.split("\n");

const generateKey = (rating: string) => {
	const codeLength: number = rawCodes[0].length;

	let filteredCodes: string[] = rawCodes;

	for (let codeNumber = 0; codeNumber < codeLength; codeNumber++) {
		if (rating === "oxygen") {
			let commonCount = 0;
			let mostCommon = 0;
			filteredCodes.map((code) => {
				code[codeNumber] === "0" ? commonCount-- : commonCount++;
			});
			commonCount >= 0 ? (mostCommon = 1) : (mostCommon = 0);
			filteredCodes = filteredCodes.filter(
				(code) => Number(code[codeNumber]) === mostCommon
			);
		} else {
			let leastCommonCount = 0;
			let leastCommon = 0;
			filteredCodes.map((code) => {
				code[codeNumber] === "0" ? leastCommonCount-- : leastCommonCount++;
			});
			leastCommonCount >= 0 ? (leastCommon = 1) : (leastCommon = 0);
			filteredCodes = filteredCodes.filter(
				(code) => Number(code[codeNumber]) !== leastCommon
			);

			if (filteredCodes.length === 1) {
				let binaryTranslation: number = 0;

				for (let codeNumber = 0; codeNumber < codeLength; codeNumber++) {
					binaryTranslation =
						binaryTranslation +
						Number(filteredCodes[0][codeNumber]) *
							Math.pow(2, codeLength - 1 - codeNumber);
				}
				return binaryTranslation;
			}
		}
	}
	let binaryTranslation: number = 0;

	for (let codeNumber = 0; codeNumber < codeLength; codeNumber++) {
		binaryTranslation =
			binaryTranslation +
			Number(filteredCodes[0][codeNumber]) *
				Math.pow(2, codeLength - 1 - codeNumber);
	}
	return binaryTranslation;
};

console.log(generateKey('oxygen') * generateKey(''))
