import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const inputValues: string[] = fs
	.readFileSync(path.resolve(__dirname, fileName))
	.toString()
	.split("\n");

const fishesString: string[] = inputValues[0].split(",");

let fishes: number[] = fishesString.map((fish) => Number(fish));

const newFish = 8;
const restartFish = 6;
const days = 200;

for (let i = 0; i < days; i++) {
	fishes.map((fish, fishIndex) => {
		if (fish === 0) {
			fishes[fishIndex] = restartFish;
			fishes.push(newFish);
		} else {
			fishes[fishIndex]--;
		}
	});
}

console.log(fishes.length);
