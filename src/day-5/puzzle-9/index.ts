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
  let vowelCounter = false
  let doubleLetterCounter = 0
  let naughtyWordsCounter = 0
  if (word.match(/[aeiou]/g)?.length! >= 3) {
    vowelCounter = true
  }
  if (word.match(/(.)\1+/g)) {
    doubleLetterCounter++
  }
  if (word.match(/ab|cd|pq|xy/)) {
    naughtyWordsCounter++
  }
  if (vowelCounter && doubleLetterCounter > 0 && naughtyWordsCounter === 0) {
    words++
  }
})
console.log(words)
