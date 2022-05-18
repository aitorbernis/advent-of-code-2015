import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const inputValues: string[] = fs.readFileSync(path.resolve(__dirname, fileName)).toString().split("\n");

const values: number[] = inputValues.map((i:string) => parseInt(i))

const count: number = values.reduce((acc, measurement, i) => {
  return acc + (measurement > values[i-1] ? 1 : 0)
}, 0)


console.log(count)