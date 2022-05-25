import fs = require("fs")
import path = require("path")
const args = process.argv.slice(2)
const isTest = (args || ["0"])[0] === "test" ? true : false
const fileName = isTest ? "input-test.txt" : "input.txt"

const inputValues: string[] = fs
  .readFileSync(path.resolve(__dirname, fileName))
  .toString()
  .split("\n")

const grid = Array.from(Array(1000).fill(0), () => new Array(1000).fill(0))
let count = 0

inputValues.forEach((i) => {
  const instruction = i.match(/(off|on|toggle)/g)?.toString()
  const firstPos = [
    Number(
      i
        .match(/\d*,\d*(?: )/g)
        ?.toString()
        .match(/\d*,/g)
        ?.toString()
        .replace(",", "")
    ),
    Number(
      i
        .match(/\d*,\d*(?: )/g)
        ?.toString()
        .match(/,\d*/g)
        ?.toString()
        .replace(",", "")
    ),
  ]
  const lastPos = [
    Number(
      i
        .match(/\d*,\d*$/g)
        ?.toString()
        .match(/\d*,/g)
        ?.toString()
        .replace(",", "")
    ),
    Number(
      i
        .match(/\d*,\d*$/g)
        ?.toString()
        .match(/,\d*/g)
        ?.toString()
        .replace(",", "")
    ),
  ]
  for (let x = firstPos[0]; x <= lastPos[0]; x++) {
    for (let y = firstPos[1]; y <= lastPos[1]; y++) {
      if (instruction === "on") {
        grid[x][y] = 1
      } else if (instruction === "off") {
        grid[x][y] = 0
      } else {
        if (grid[x][y] === 0) {
          grid[x][y] = 1
        } else {
          grid[x][y] = 0
        }
      }
    }
  }
})
grid.map((x) => {
  x.map(y => {
    if (y === 1) {
      count++
    }
  })
})
console.log(count)
