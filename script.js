'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');

let currentScore0El = document.querySelector('#current--0');
let currentScore1El = document.querySelector('#current--1');

const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const scoreHoldBtn = document.querySelector('.btn--hold');


const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


let scores, currentScore, activePlayer, playing;


const init = function () {
    scores = [0, 0];
    currentScore = 0; // to store & add random generated number ;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    dice.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

rollDiceBtn.addEventListener('click', function () {

    if (playing) {
        //Generate 1-6 random number
        let randomNumber = Math.floor(Math.random() * 6) + 1
        // console.log(randomNumber);

        //0. Unhide the dice image
        dice.classList.remove('hidden');

        //1. Show dice image as per generated number;
        dice.src = `dice-${randomNumber}.png`;

        //2. If not 1 then add dice number to current score(as of now for player one only)
        if (randomNumber !== 1) {
            currentScore += randomNumber;
            // currentScore0El.textContent = currentScore;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {

            switchPlayer();

        }
    }

});


scoreHoldBtn.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active players score

        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

newGameBtn.addEventListener('click', init);
