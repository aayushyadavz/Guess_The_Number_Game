// For Random number generation
let randomNumber = parseInt(Math.random() * 100 + 1)

// Selecting the needed elements
const userInput = document.querySelector('#guessField')
const submit = document.querySelector('#subt')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

// Creating a new paragraph element
const p = document.createElement('p')
p.style.color = "red"

let prevGuess = [] // To store user's previous guessed values.
let numGuess = 1 // To start guess from 1.
let playgame = true /* Whenever we develop games like this then we have variable like this
which allows user to play the game. */

// User available for playing game or not.
if (playgame) {
    submit.addEventListener('click', (e) => {
        e.preventDefault(); // To stop default action of form.
        const guess = parseInt(userInput.value) // selecting userInput values.
        console.log(guess);
        validateGuess(guess) // Passed as it to the next.
    })
}

// doing validation that value is between 1 to 100 or not and value exist or not.
function validateGuess(guess) {
    if(isNaN(guess)) {
        alert(`Please enter a valid number`)
    } else if(guess < 1) {
        alert(`Please enter number greater than 1`)
    } else if(guess > 100) {
        alert(`Please enter number less than 100`)
    } else {
        prevGuess.push(guess) // Pushed the userInput valid numbers in that Array.
        // Checking if user's attempt is not overed.
        if (numGuess === 10) {
            cleanUpGuess(guess)
            displayMessage(`Game Over. &#128529 Your Random number was ${randomNumber}`)
            endGame()
        } else { // When number is less than 11.
            cleanUpGuess(guess)
            checkGuess(guess)
        }
    }
}

// checking value is equal to random no. or not, if low or high, game won or not. 
function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right`)
    } else if (guess < randomNumber) {
        displayMessage(`Your number is too Low`)
    } else if (guess > randomNumber) {
        displayMessage(`Your number is too high`)
    }
}

// cleans the value so that can enter new value, updates guess array & guess remaining.
function cleanUpGuess(guess) {
    userInput.value = '' // Value updated with empty string after submiting the value.
    guessSlot.innerHTML += `${guess} ` // Guess value is pushed in that span element.
    numGuess++ // numGuess started from 1 should increase.
    remaining.innerHTML = `${11 - numGuess}` // Value will be updated in that span element.
}

// take reference from lowOrHigh and prints a message.
function displayMessage(message) {
    lowOrHi.innerHTML = `<h3>${message}</h3>`
}

function endGame() {
    userInput.value = '' //  Value updated with empty string.
    userInput.setAttribute('disabled', '') // #guessField will be disabled.
    p.classList.add('button') // Created para element will behave like button.
    p.innerHTML = '<h2 id="newGame">Start new Game</h2>'
    startOver.appendChild(p) // paragraph element will be added in .resultParas div.
    playgame = false
    newGame()
}

function newGame() {
    const createGameButton = document.querySelector('#newGame')
    createGameButton.addEventListener('click', function(e) { // On that p which behaves like button.
        randomNumber = parseInt(Math.random() * 100 + 1) 
        prevGuess = [] // Empty that array
        numGuess = 1 // To again start guess from 1.
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${10 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playgame = true
    })
}