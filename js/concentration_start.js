var btn = document.getElementsByTagName("button")[0];
var imgs = [];

var numberOfCards = 6;

ConcentrationApp = function () {
    var self = this;

    this.numberMatch = 0;
    this.cards = [];
    this.card1 = null;
    this.card2 = null;

this.click = function(event) {

    //Grabbing the event target and checking to see
    //what card from our index it matches
    var target = (function(t) {
        for (var i=0; i< self.cards.length; i++) {
            if(t === self.cards[i].html) {
                self.cards[i].html.classList.add("selected");
                return self.cards[i];
            }
        }
    }(event.target));

    //Game logic
    //If the card click is selected
    if (this.classList.contains("selected") === true) {
        //If no card has been chosen yet
        if(self.card1 === null && self.card2 === null) {
            self.card1 = target;
        } else if (self.card1 !== null && self.card2 === null) {
            self.card2 = target;
            
            //Check for a match
            if(self.card1.value === self.card2.value) {
                self.cardMatch();
            } else {
                self.cardMismatch();
            }
        }
    }
}
    this.init();

};

ConcentrationApp.prototype.init = function() {
    for(var i=0; i<numberOfCards; i++) {
        this.cards.push(new Util.Card(i));
        this.cards.push(new Util.Card(i));
    }
    
    Util.shuffle(this.cards);
    
    for (var i=0; i<this.cards.length; i++) {
        document.body.appendChild(this.cards[i].html);
        this.cards[i].html.addEventListener('click', this.click);
    }
};

ConcentrationApp.prototype.cardMatch = function() {
    var self = this;
    this.numberMatch += 1;
    console.log(this);
    
    window.setTimeout(function(){
        self.card1.html.classList.add('matched');
        self.card2.html.classList.add('matched');
    }, 100);
    
    window.setTimeout(function(){
        self.card1.html.classList.remove('selected');
        self.card2.html.classList.remove('selected');
        self.card1 = null;
        self.card2 = null;
    }, 200);
    
    if(this.numberMatch === numberOfCards) {
        alert("You win! Congrats!");
    }
};

ConcentrationApp.prototype.cardMismatch = function() {
    var self = this;
    console.log(this);
    //Change the card state back to
    window.setTimeout(function(){
        self.card1.html.classList.remove('selected');
        self.card2.html.classList.remove('selected');
        self.card1 = null;
        self.card2 = null;
    }, 100);
};

var game = new ConcentrationApp();


btn.addEventListener("click", function(){
    //listen for click of 'start' button then make an array of form entries
    for(var i = 0; i < numberOfCards; i++){
        var k = document.getElementsByTagName("input")[i].value;
        imgs[i]= k;
    }
  
    Util.shuffle(game.cards);
  
    var j = 0;
    for(var i = 0; i < numberOfCards*2; i+=2){
    //change the src for the cards to user provided images      
      if(imgs[j] != ""){
            game.cards[i].imgSrc = imgs[j];
            game.cards[i+1].imgSrc = imgs[j];
            game.cards[i].value = j;
            game.cards[i+1].value = j;
            game.cards[i].html.innerHTML = '<img class="inner_card" height="200"  src="' + imgs[j] + '"/>';
                console.log(game.cards[i]);
            game.cards[i+1].html.innerHTML = '<img class="inner_card" height="200"  src="' + imgs[j] + '"/>';
      }
        j++;          
    }

});