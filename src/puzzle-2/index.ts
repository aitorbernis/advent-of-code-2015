import fs = require("fs")
import path = require("path")
const args = process.argv.slice(2)
const isTest = (args || ["0"])[0] === "test" ? true : false
const fileName = isTest ? "input-test.txt" : "input.txt"

const inputValues: string = fs.readFileSync(path.resolve(__dirname, fileName)).toString()
let counter = 0
const openingBracket = "("
const closingBracket = "("
for (let i = 0; i < inputValues.length; i++) {
  if (inputValues[i] === openingBracket) {
    counter++
  } else {
    counter--
  }
  if (counter === -1) {
    console.log(i + 1)
    break
  }
}
