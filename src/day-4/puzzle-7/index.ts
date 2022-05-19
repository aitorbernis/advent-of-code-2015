import fs = require("fs")
import path = require("path")
const md5 = require("blueimp-md5")
const args = process.argv.slice(2)
const isTest = (args || ["0"])[0] === "test" ? true : false
const fileName = isTest ? "input-test.txt" : "input.txt"

const inputValues: string[] = fs
  .readFileSync(path.resolve(__dirname, fileName))
  .toString()
  .split("\n")

let hash: string
let i = -1

do {
  i++
  hash = md5(`iwrupvqb${i}`).toString()
} while (hash.slice(0, 5) !== "00000")

console.log(`Answer is \n${i}`)
