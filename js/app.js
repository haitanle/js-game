
let playersList = ["kdb","ronaldo","messi","pogba","hazard","modric","neymar","salah"];

let duplicateList = performDuplicate(playersList);


/*
*startTimer function
* start the timer at first click
*/
function startTimer(){
	if (secondsElapsed === 0 ){
		secondsElapsed++;
		timerDisplay = setInterval(function(){
			document.querySelector('.timer').innerText = secondsElapsed++;
		},1000);
	}
}

/*
* resetTimer function
*  reset timer and display
*/ 
function resetTimer(){
	clearInterval(timerDisplay);
	document.querySelector('.timer').innerText = secondsElapsed;
}

/*
* performDuplicate function
*  return a list of duplicates for each element
*/
function performDuplicate(list){
	const duplicateList=[];

	for(var i = 0; i< list.length;++i){
	  duplicateList.push(list[i]);
	  duplicateList.push(list[i]);
	}
	return duplicateList; 
}


/* 
 * setupGame function
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function setupGame(){
	counter = 0;
	starsCount = 3;
	secondsElapsed = 0;
	counterDisplay.textContent = counter;

	const duplicateList = performDuplicate(playersList);
	const listRandom = shuffle(duplicateList);
	const deck = document.querySelector('.deck');

	resetStars();
	resetTimer();	

	deck.innerHTML = '';
	openCards = [];
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

	for(var i = 0; i < duplicateList.length; i++){
		if (duplicateList[i] == cardName){ duplicateList.splice(i, 2);}
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
	 }, 1000);

}


/*
* incrementCounter Function
* 	increment count of click by 1 
*/
function incrementCounter(){
	counter++;
	counterDisplay.textContent = counter;
}



let counter;
let starsCount;
let secondsElapsed = 0;
let timerDisplay; 

const counterDisplay = document.querySelector('.moves');

let openCards = [];

setupGame();

document.querySelector('.deck').addEventListener('click', function(event){

		startTimer();
		
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
			incrementCounter();
			calculateStarRating();

		}	
		console.log(duplicateList);

	console.log('length '+duplicateList.length);
	if (duplicateList.length === 0){
		gameFinished(counter);
	}

});


document.querySelector('.restart').addEventListener('click', function(event){
	setupGame();
});



/*
* resetStars function
*  reset to 3 stars for new game
*/
function resetStars(){
	const stars = document.querySelector('.stars');
	stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
}




/*
* calculateStarRating function
*	determinie and display star rating based on counter 
*/
function calculateStarRating(){
	const stars = document.querySelector('.stars');
	if (counter === 11 || counter === 16){
		stars.removeChild(stars.firstElementChild);
		stars.insertAdjacentHTML('beforeend','<li><i class="fa fa-star-o"></i></li>');
		starsCount--;
	}
}



/*
* gameFinished function
* check if the game is finished 
* 	-display modal of completion
*/
function gameFinished(counter){

				console.log('Game Finished!!');
				clearInterval(timerDisplay);

				document.querySelector('.container').style.display = 'none';
				document.querySelector('.finished').style.display = 'flex';

				const result = document.createElement('span');

				result.textContent = 'With '+ counter + ' moves and '+ starsCount + ' stars' 
					+ ' with '+ secondsElapsed +' seconds elapsed.';

				document.querySelector('.finished').appendChild(result);
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
