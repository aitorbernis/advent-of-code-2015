import fs = require("fs")
import path = require("path")
const args = process.argv.slice(2)
const isTest = (args || ["0"])[0] === "test" ? true : false
const fileName = isTest ? "input-test.txt" : "input.txt"

const inputValues: string[] = fs
  .readFileSync(path.resolve(__dirname, fileName))
  .toString()
  .split("\n")

let words = 0

inputValues.map((word) => {
  let hasFirst = false
  let hasSecond = false
  for (let i = 0; i < word.length - 1; i++) {
    const pairOfLetters = word.slice(i, 2 + i)
    const remainingString = word.substring(i + 2, word.length )
    // console.log(newWord)
    // console.log(aa)
    if (remainingString.includes(pairOfLetters)) {
      hasFirst = true
      console.log(pairOfLetters)
    }
  }
  if (word.match(/(.)\w\1/g)) {
    hasSecond = true
  }
  if (hasFirst === true && hasSecond === true) {
    words++
  }
})
console.log(words)
