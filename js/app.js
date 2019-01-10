/*
 * Create a list that holds all of your cards
 */
var playersList = ["kdb","ronaldo","messi","pogba","hazard","modric","neymar","salah","kdb","ronaldo","messi","pogba","hazard","modric","neymar","salah"];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//TODO: duplicate player list 

var playersListRandom = shuffle(playersList);

var deck = document.querySelector('.deck');

//shuffle cards
playersListRandom.forEach(function(player){
	deck.innerHTML += `<li class="card">
                <i class="tile ${player}"></i>
            </li>`;
});



var className;

var firstSelect;
var secondSelect;

//on click show the card and get the card name for matching 
document.querySelector('.deck').addEventListener('click', function(event){
		//console.log(event.target);
		// event.target.classList.add('show');
		// className =  '.'+ event.target.children.item(0).classList[1];
		console.log('what to show: ' + event.target.children.item(0).classList);
		event.target.children.item(0).classList.add('show');



		//get card clicked
		if (firstSelect == null ){
			console.log(firstSelect)
			firstSelect = event.target.children.item(0).classList[1];
			console.log(firstSelect)
		}else{
			console.log(secondSelect)
			secondSelect = event.target.children.item(0).classList[1];
			console.log(secondSelect)
		}
		
		//check if First name matches with second selection
			//check if it is first selection
		// console.log(className);

		console.log('first select is '+firstSelect);
		console.log('second select is '+secondSelect);

		if (firstSelect === secondSelect && firstSelect != null){
			console.log('card matched');

					//card match, remove card from playerList
			        for(var i = playersList.length-1; i--;){
						if (playersList[i] === firstSelect) playersList.splice(i, 1);
					}

					firstSelect = null;
					secondSelect = null;

		}else if (firstSelect != secondSelect && secondSelect != null) {
			console.log('card do not match');
			

			//document.querySelector('.'+firstSelect).classList.remove('show');

				//card do not match, unflip the card
				var divs = document.querySelectorAll('.'+firstSelect), i;
				var second = document.querySelectorAll('.'+secondSelect), n;


				//set timeout function to flip and turn over card if they do not match
				setTimeout(function(){

				for (i = 0; i < divs.length; ++i) {

						if (divs[i].classList.contains('show')){
							divs[i].classList.remove('show');
						}
				}


				for (n = 0; n < second.length; ++n) {

						if (second[n].classList.contains('show')){
							second[n].classList.remove('show');
							event.stopPropagation();
						}
				}

				 }, 3000);


		}


		if (secondSelect != null){
			firstSelect = null;
			secondSelect = null;
		}

		console.log(playersList);

});





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
