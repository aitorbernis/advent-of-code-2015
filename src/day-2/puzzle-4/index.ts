import fs = require("fs")
import path = require("path")
const args = process.argv.slice(2)
const isTest = (args || ["0"])[0] === "test" ? true : false
const fileName = isTest ? "input-test.txt" : "input.txt"

const inputValues: string[] = fs
  .readFileSync(path.resolve(__dirname, fileName))
  .toString()
  .split("\n")

let wrapping = 0
inputValues.forEach((present) => {
  const presentSizes = present.split("x")
  const side1 = Number(presentSizes[0])
  const side2 = Number(presentSizes[1])
  const side3 = Number(presentSizes[2])
  const smallestSize = Math.min(side1, side2, side3)
  // const smallestPosition = presentSizes.indexOf(smallestSize.toString())
  // const secondSmallest = presentSizes.splice(smallestPosition, 1)
  const sortedArray = [side1, side2, side3].sort((a, b) => a - b)

  wrapping = wrapping + 2 * sortedArray[0] + 2 * sortedArray[1] + side1*side2*side3
})
console.log(wrapping)
