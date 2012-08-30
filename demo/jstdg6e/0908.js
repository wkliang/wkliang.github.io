
// pg#218, Example 9-8. Representing cards with enumerated types

// Define a class to representing cards with enumerated types
function Card(suit, rank) {
	this.suit = suit;	// Each card has a suit
	this.rank = rank;	// and a rank
}

// These enumerated types define the suit and rank values
Card.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4});
Card.Rank = enumeration({Two: 2, Three: 3, Four: 4, Five: 5, Six: 6,
		Seven: 7, Eight: 8, Nine: 9, Ten: 10,
		Jack: 11, Queen: 12, King: 13, Ace: 14});

// Define a textual representation for a card
Card.prototype.toString = function() {
	// wkliang:20120820: Why cannot use following statement instead??
	// wkliang:20120823: Since valueOf() had been defined
	// return "" + this.rank + " of " + this.suit;
	return this.rank.toString() + " of " + this.suit.toString();
};

// Compare the value of two cards as you would in poker
Card.prototype.compareTo = function(that) {
	if (this.rank < that.rank)	return -1;
	if (this.rank > that.rank)	return +1;
	return 0;
};

// A function for ordering cards as you would in poker
Card.orderByRank = function(a,b) {
	return a.compareTo(b);
};

// A function for ordering cards as you would in bridge
Card.orderBySuit = function(a,b) {
	if (a.suit < b.suit)	return -1;
	if (a.suit > b.suit)	return +1;
	return a.compareTo(b);
}

// Define a class to represent a standard deck of cards
function Deck() {
	var cards = this.cards = [];	// A deck is just an array of cards
	Card.Suit.foreach(function(s) {	// Initialize the array
			Card.Rank.foreach(function(r) {
				cards.push(new Card(s,r));
			});
		});
}

// Shiffle method: shuffles cards in place and returns the deck
Deck.prototype.shuffle = function() {
    // For each element in the array, swap with a randomly chosen lower element
    var deck = this.cards, len = deck.length;
    for (var i = len-1; i > 0; i--) {
	var r = Math.floor(Math.random()*(i+1)), temp;	// Random number
	temp = deck[i], deck[i] = deck[r], deck[r] = temp;	// Swap
    }
    return this;
};

// Deal method: returns an array of cards
Deck.prototype.deal = function(n) {
	if (this.cards.length < n)
		throw "Out of cards";
	return this.cards.splice(this.cards.length-n,n);
};

// Create a new deck of cards, shuffle it, and deal a bridge hand

(function() {
	var deck = (new Deck()).shuffle();
	for (var i = 0; i < 4; i++) {
		var hand = deck.deal(13).sort(Card.orderBySuit);
		var j = 0;
		var str = "Player " + i + ": " + hand[j++];
		for (; j < 13; j++) {
			str +=  ", " + hand[j];
		}
		console.log(str);
	}
}());
