const imagePaths = ['Picture1.png', 'Picture2.png', 'Picture3.png', 'Picture4.png', 'Picture5.png', 'Picture6.png', 'Picture7.png', 'Picture8.png',
 'Picture9.png', 'Picture10.png', 'Picture11.png', 'Picture12.png', 'Picture13.png', 'Picture14.png', 'Picture15.png', 'Picture16.png' ]; // Your actual images
let cards = [...imagePaths, ...imagePaths]; // Create pairs by dubbling the array
let flippedCards = []; // temporary array that tracks fliped cards.


// randomize array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const board = document.getElementById('board'); //Get the element with the ID board from memory.html file
    board.innerHTML = '';
    shuffle(cards).forEach((img, index) => {
        const card = document.createElement('div'); // Creates a "node" in memory
        card.classList.add('card'); //Attaches custom metadata to the HTML element. This is where we "hide" the image path inside the div.
        card.dataset.value = img;
        card.onclick = () => flipCard(card); // Finalizes the render by physically inserting the element into the HTML tree
        board.appendChild(card);
    });
}


function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) { // checks if there is alread a "flipped" card, if not add card
        card.classList.add('flipped'); // flipped as a css class that is now triggerd
        card.innerHTML = `<img src="${card.dataset.value}" width="80%">`;
        flippedCards.push(card);

        if (flippedCards.length === 2) { // condition to check if two cards are being compared
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) { //if two cards are the same
        setTimeout(() => {// A pause, like "sleep(), but this is a trick to remain in the webpage
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
        }, 500);
    } else {// two caards are different
        setTimeout(() => { 
            card1.classList.remove('flipped');
            card1.innerHTML = '';
            card2.classList.remove('flipped');
            card2.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    createBoard();
	
}

createBoard();

