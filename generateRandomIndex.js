const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = upperLetters.toLowerCase()
const number = '0123456789'
const collection = upperLetters + lowerLetters + number

function generateRandomIndex () {
  let shortCode = ''
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * collection.length)
    shortCode += collection[randomIndex]
  }
  return shortCode
}

module.exports = generateRandomIndex