
let playersList = ["kdb","ronaldo","messi","pogba","hazard","modric","neymar","salah","kdb","ronaldo","messi","pogba","hazard","modric","neymar","salah"];



//TODO: duplicate player list 


/* 
 * setupGame function
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function setupGame(){
	counter = 0; 
	counterDisplay.textContent = counter;

	const listRandom = shuffle(playersList);
	const deck = document.querySelector('.deck');

	listRandom.forEach(function(player){
		deck.innerHTML += `<li class="card">
                <i class="tile ${player}"></i>
           		</li>`;
	});
}

/*
* showCard function
* 	-flip and animate the card on the screen
*/
function showCard(card){
	card.classList.add('show');
}


/*
* removeCardFromList function
* Remove card from list
	-remove all cardName from the list
*
*/ 
function removeCardFromList(cardName){

	for(var i = playersList.length-1; i--;){
		if (playersList[i] === cardName) playersList.splice(i, 1);
	}
}

/*
* unflipCard function
* unflip 2 cards when they do not match
* 	-flip takes 3000ms to take place
*/
function unflipCard(firstCard, secondCard){

var firstCardNode = document.querySelectorAll('.'+ firstCard), i;
var secondCardNode = document.querySelectorAll('.'+ secondCard), n;

	setTimeout(function(){
		for (i = 0; i < firstCardNode.length; ++i) {
				if (firstCardNode[i].classList.contains('show')){
					firstCardNode[i].classList.remove('show');
				}
		}
		for (n = 0; n < secondCardNode.length; ++n) {
				if (secondCardNode[n].classList.contains('show')){
					secondCardNode[n].classList.remove('show');
				}
		}
	 }, 2000);
}

/*
* incrementCounter Function
* 	increment count of click by 1 
*/
function incrementCounter(){
	counterDisplay.textContent++;
}

let counter;
const counterDisplay = document.querySelector('.moves');

let openCards = [];

setupGame();


document.querySelector('.deck').addEventListener('click', function(event){

		console.log('what to show: ' + event.target.children.item(0).classList);

		let cardNode = event.target.children.item(0);

		showCard(cardNode);

		cardName = cardNode.classList[1];  //shouldn't use index/not accurate


		//function determine matching
		if (openCards.length === 0 ){
			openCards.push(cardName);
		} else {

			let cardFromList = openCards.pop();

			if (cardFromList=== cardName){
				console.log('Card Matched');

				removeCardFromList(cardName);
			}else{

				console.log('Card do not matched');

				unflipCard(cardFromList, cardName);
			}
		}	

		console.log(playersList);

		incrementCounter();

		//gameFinishedCheck function
		gameFinishedCheck();
});


/*
* gameFinishedCheck function
* check if the game is finished 
* 	-display modal of completion
*/
function gameFinishedCheck(){
			if (playersList.length === 0){
				console.log('Game Finished!!')
			}
		}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
