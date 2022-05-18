import fs from 'fs';
import { exec } from 'child_process';
let packageJson = require('./../package.json');

// read command line argument (npm run create-puzzle ARGUMENT)
const args = process.argv.slice(2);

// assign the ARGUMENT (args) to the day const
const day = parseInt((args || ["0"])[0]);

console.log(`Day ${day}`);

const puzzles: number[] = [day*2-1, day*2];

fs.mkdirSync(`./src/day-${day}`)

puzzles.forEach(p => {

    fs.mkdirSync(`./src/day-${day}/puzzle-${p}`);

    // define a starter code that is usually always needed to read the input
    // (isTest = npm run puzzle-X or npm run puzzle-X test) if you want to use the input or input-test files
    const codeStarter = `import fs = require("fs");
import path = require("path");
const args = process.argv.slice(2);
const isTest = (args || ["0"])[0] === "test" ? true : false;
const fileName = isTest ? "input-test.txt" : "input.txt";

const inputValues: string[] = fs.readFileSync(path.resolve(__dirname, fileName)).toString().split("\\n");`;
    // create each of the needed files
    fs.writeFileSync(`./src/day-${day}/puzzle-${p}/index.ts`, codeStarter);
    fs.writeFileSync(`./src/day-${day}/puzzle-${p}/input.txt`, "");
    fs.writeFileSync(`./src/day-${day}/puzzle-${p}/input-test.txt`, "");

    // edit the packageJson scripts section to add the puzzle
    packageJson.scripts[`puzzle-${p}`] = `ts-node ./src/day-${day}/puzzle-${p}/index.ts`;
    fs.writeFileSync(`./package.json`, JSON.stringify(packageJson, null, 2));
});
// open first puzzle in VS Code, open the input test file, the input file and the puzzle itself
exec(`code . ./src/day-${day}/puzzle-${puzzles[0]}/input-test.txt ./src/day-${day}/puzzle-${puzzles[0]}/input.txt ./src/day-${day}/puzzle-${puzzles[0]}/index.ts`, (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stdout);    
});