import fs = require("fs")
import path = require("path")
const args = process.argv.slice(2)
const isTest = (args || ["0"])[0] === "test" ? true : false
const fileName = isTest ? "input-test.txt" : "input.txt"

const inputValues: string = fs.readFileSync(path.resolve(__dirname, fileName)).toString()

let positions: number[][] = [[0, 0]]

for (let i = 0; i < inputValues.length; i++) {
  if (inputValues[i] === "^") {
    if (
      positions.find(
        (a) => a == [positions[positions.length - 1][0] + 1, positions[positions.length - 1][1]]
      )
    ) {
      break
    } else {
      positions.push([positions[positions.length - 1][0] + 1, positions[positions.length - 1][1]])
    }
  } else if (inputValues[i] === "v") {
    if (
      positions.find(
        (a) => a == [positions[positions.length - 1][0] - 1, positions[positions.length - 1][1]]
      )
    ) {
      break
    } else {
      positions.push([positions[positions.length - 1][0] - 1, positions[positions.length - 1][1]])
    }
  } else if (inputValues[i] === "<") {
    if (
      positions.find(
        (a) => a == [positions[positions.length - 1][0], positions[positions.length - 1][1] - 1]
      )
    ) {
      break
    } else {
      positions.push([positions[positions.length - 1][0], positions[positions.length - 1][1] - 1])
    }
  } else if (inputValues[i] === ">") {
    if (
      positions.find(
        (a) => a == [positions[positions.length - 1][0], positions[positions.length - 1][1] + 1]
      )
    ) {
      break
    } else {
      positions.push([positions[positions.length - 1][0], positions[positions.length - 1][1] + 1])
    }
  }
}
positions.sort((a, b) => {
  if (a[0] == b[0]) {
    return a[1] - b[1]
  }
  return a[0] - b[0]
})

let stringArray = positions.map((i) => i.toString())
let finalSet = new Set(stringArray)
console.log(finalSet.size)
