import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const inputValue = fs
	.readFileSync(path.resolve(__dirname, fileName))
	.toString()
	.split(",");

const fishes = inputValue.map((fish) => Number(fish));
const totalFishesArray = Array(9).fill(0);
fishes.map((fish) => {
	totalFishesArray[fish]++;
});

const days = 18;

for (let i = 0; i < days; i++) {
	console.log(totalFishesArray)
	let movingFish = totalFishesArray.shift();

	totalFishesArray.push(movingFish);

	totalFishesArray[6] = totalFishesArray[6] + movingFish;
}

console.log(totalFishesArray.reduce((a, b) => a + b, 0));
