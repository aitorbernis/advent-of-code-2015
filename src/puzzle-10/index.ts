import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const inputValues: string[] = fs
	.readFileSync(path.resolve(__dirname, fileName))
	.toString()
	.split("\n");

const allLinesRaw: string[][] = inputValues.map((line) =>
	line.replace(/ -> /g, ";").split("," && ";")
);
const lines: number[][][] = allLinesRaw.map((line) =>
	line
		.map((point) => point.split(","))
		.map((point) => point.map((value) => Number(value)))
);

for (let i = 0; i < lines.length; i++) {
	if (lines[i][0][0] !== lines[i][1][0] && lines[i][0][1] !== lines[i][1][1]) {
		if (
			Math.abs(lines[i][0][0] - lines[i][1][0]) !==
			Math.abs(lines[i][0][1] - lines[i][1][1])
		) {
			lines.splice(i, 1);
			i--;
		}
	}
}

const size = isTest ? 10 : 1000;

let points: number[][] = [];

lines.map((line, lineIndex) => {
	points.push(line[0], line[1]);
	// si primer terme del primer i primer del segon son iguals
	if (line[0][0] === line[1][0]) {
		// si segon terme del primer es mes gran que segon terme del segon
		if (line[0][1] > line[1][1]) {
			for (let i = line[1][1] + 1; i < line[0][1]; i++) {
				points.push([line[0][0], i]);
			}
		} else if (line[0][1] < line[1][1]) {
			for (let i = line[0][1] + 1; i < line[1][1]; i++) {
				points.push([line[0][0], i]);
			}
		}
	} else if (line[0][1] === line[1][1]) {
		// si segon terme del primer es mes gran que segon terme del segon
		if (line[0][0] > line[1][0]) {
			for (let i = line[1][0] + 1; i < line[0][0]; i++) {
				points.push([i, line[0][1]]);
			}
		} else if (line[0][0] < line[1][0]) {
			for (let i = line[0][0] + 1; i < line[1][0]; i++) {
				points.push([i, line[0][1]]);
			}
		}
	} else if (line[0][0] > line[1][0]) {
		if (line[0][1] > line[1][1]) {
			for (let i = 1; i < line[0][0] - line[1][0]; i++) {
				points.push([line[1][0] + i, line[1][1] + i]);
			}
		} else if (line[0][1] < line[1][1]) {
			for (let i = 1; i < line[0][0] - line[1][0]; i++) {
				points.push([line[1][0] + i, line[1][1] - i]);
			}
		}
	} else if (line[0][0] < line[1][0]) {
		if (line[0][1] > line[1][1]) {
			for (let i = 1; i < line[1][0] - line[0][0]; i++) {
				points.push([line[1][0] - i, line[1][1] + i]);
			}
		} else if (line[0][1] < line[1][1]) {
			for (let i = 1; i < line[1][0] - line[0][0]; i++) {
				points.push([line[1][0] - i, line[1][1] - i]);
			}
		}
	}
});

// console.log(lines);
// console.log(points);

let gameBoard: number[][] = new Array(size)
	.fill(0)
	.map((i) => new Array(size).fill(0));

for (let i = 0; i < points.length; i++) {
	gameBoard[points[i][1]][points[i][0]]++;
}

// console.log(gameBoard);

let count = 0;

gameBoard.map((row) => {
	row.map((number) => {
		if (number >= 2) {
			count++;
		}
	});
});

console.log(count);
