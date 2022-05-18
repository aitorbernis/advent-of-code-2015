import fs = require("fs")
import path = require("path")
const args = process.argv.slice(2)
const isTest = (args || ["0"])[0] === "test" ? true : false
const fileName = isTest ? "input-test.txt" : "input.txt"

const inputValues: string = fs.readFileSync(path.resolve(__dirname, fileName)).toString()

let positionsSanta: number[][] = [[0, 0]]
let positionsRobot: number[][] = [[0, 0]]

for (let i = 0; i < inputValues.length; i++) {
  if (inputValues[i] === "^") {
    if (i % 2 == 0) {
      if (
        positionsSanta.find(
          (a) =>
            a ==
            [
              positionsSanta[positionsSanta.length - 1][0] + 1,
              positionsSanta[positionsSanta.length - 1][1],
            ]
        )
      ) {
        break
      } else {
        positionsSanta.push([
          positionsSanta[positionsSanta.length - 1][0] + 1,
          positionsSanta[positionsSanta.length - 1][1],
        ])
      }
    } else {
      if (
        positionsRobot.find(
          (a) =>
            a ==
            [
              positionsRobot[positionsRobot.length - 1][0] + 1,
              positionsRobot[positionsRobot.length - 1][1],
            ]
        )
      ) {
        break
      } else {
        positionsRobot.push([
          positionsRobot[positionsRobot.length - 1][0] + 1,
          positionsRobot[positionsRobot.length - 1][1],
        ])
      }
    }
  } else if (inputValues[i] === "v") {
    if (i % 2 == 0) {
      if (
        positionsSanta.find(
          (a) =>
            a ==
            [
              positionsSanta[positionsSanta.length - 1][0] - 1,
              positionsSanta[positionsSanta.length - 1][1],
            ]
        )
      ) {
        break
      } else {
        positionsSanta.push([
          positionsSanta[positionsSanta.length - 1][0] - 1,
          positionsSanta[positionsSanta.length - 1][1],
        ])
      }
    } else {
      if (
        positionsRobot.find(
          (a) =>
            a ==
            [
              positionsRobot[positionsRobot.length - 1][0] - 1,
              positionsRobot[positionsRobot.length - 1][1],
            ]
        )
      ) {
        break
      } else {
        positionsRobot.push([
          positionsRobot[positionsRobot.length - 1][0] - 1,
          positionsRobot[positionsRobot.length - 1][1],
        ])
      }
    }
  } else if (inputValues[i] === "<") {
    if (i % 2 == 0) {
      if (
        positionsSanta.find(
          (a) =>
            a ==
            [
              positionsSanta[positionsSanta.length - 1][0],
              positionsSanta[positionsSanta.length - 1][1] - 1,
            ]
        )
      ) {
        break
      } else {
        positionsSanta.push([
          positionsSanta[positionsSanta.length - 1][0],
          positionsSanta[positionsSanta.length - 1][1] - 1,
        ])
      }
    } else {
      if (
        positionsRobot.find(
          (a) =>
            a ==
            [
              positionsRobot[positionsRobot.length - 1][0],
              positionsRobot[positionsRobot.length - 1][1] - 1,
            ]
        )
      ) {
        break
      } else {
        positionsRobot.push([
          positionsRobot[positionsRobot.length - 1][0],
          positionsRobot[positionsRobot.length - 1][1] - 1,
        ])
      }
    }
  } else if (inputValues[i] === ">") {
    if (i % 2 == 0) {
      if (
        positionsSanta.find(
          (a) =>
            a ==
            [
              positionsSanta[positionsSanta.length - 1][0],
              positionsSanta[positionsSanta.length - 1][1] + 1,
            ]
        )
      ) {
        break
      } else {
        positionsSanta.push([
          positionsSanta[positionsSanta.length - 1][0],
          positionsSanta[positionsSanta.length - 1][1] + 1,
        ])
      }
    } else {
      if (
        positionsRobot.find(
          (a) =>
            a ==
            [
              positionsRobot[positionsRobot.length - 1][0],
              positionsRobot[positionsRobot.length - 1][1] + 1,
            ]
        )
      ) {
        break
      } else {
        positionsRobot.push([
          positionsRobot[positionsRobot.length - 1][0],
          positionsRobot[positionsRobot.length - 1][1] + 1,
        ])
      }
    }
  }
}
positionsSanta.sort((a, b) => {
  if (a[0] == b[0]) {
    return a[1] - b[1]
  }
  return a[0] - b[0]
})
positionsRobot.sort((a, b) => {
  if (a[0] == b[0]) {
    return a[1] - b[1]
  }
  return a[0] - b[0]
})

let stringArraySanta = positionsSanta.map((i) => i.toString())
let stringArrayRobot = positionsRobot.map((i) => i.toString())
let arrayFromSetSanta = Array.from(new Set(stringArraySanta))
let arrayFromSetRobot = Array.from(new Set(stringArrayRobot))
const finalArray = arrayFromSetSanta.concat(arrayFromSetRobot)
const finalSetArray = new Set(finalArray)
console.log(finalSetArray.size)
