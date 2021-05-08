//simple black jack
export default class Game {
    constructor() {
        this.pack = [{

            type:"heart",
            cards:[1,2,3,4,5,6,7,8,9,10,14,12,13]
    
        }, {
    
            type:"club",
            cards:[1,2,3,4,5,6,7,8,9,10,14,12,13]
        }, {
    
            type:"diamond",
            cards:[1,2,3,4,5,6,7,8,9,10,14,12,13]
        }, {
    
            type:"spade",
            cards:[1,2,3,4,5,6,7,8,9,10,14,12,13]
        }];
    
        this.dealerCards = new Array;
        this.clientCards = new Array;
        this.clientWon = false;
        this.dealerWon = false;
        this.gameOver = false;
        this.clientSum = 0;
        this.dealerSum = 0;
        this.newGame();

    }

   
    

    newGame(){

        //1st dealer cards
        this.giveDealerCards();
        this.giveDealerCards();
        if(this.dealerAmount() == 21){

            this.dealerWon = true;
        }
        

        //2st client cards
        this.giveClientCards();
        this.giveClientCards();
        if(this.clientAmount() == 21){

            this.clientWon = true;
        }
        

    }

    giveDealerCards(){
        let numb = this.randomCard();
        this.dealerCards.push(numb);
        return numb;
        
    }

    giveClientCards(){

        let numb = this.randomCard();
        this.clientCards.push(numb);
        return numb;
        
    }

    changeA(){


    }

    clientCheck(){
        if(this.clientAmount() > 21){

            this.gameOver = true;
        }
      
        if(this.clientAmount() >= this.dealerAmount()){

            this.clientWon = true;
        }else{

            this.dealerWon = true;
        }

    }

    dealerCheck(){
        if(this.dealerAmount() > 21){

            this.gameOver = true;
        }
      
        if(this.clientAmount() >= this.dealerAmount()){

            this.clientWon = true;
        }else{

            this.dealerWon = true;
        }

    }

    dealerAmount(){
        this.dealerSum = 0;
        for(let i = 0; i<this.dealerCards.length; i++){
            if(this.dealerCards[i] > 11){

                this.dealerSum += 10
            }else{
                this.dealerSum += this.dealerCards[i];
            }
        }
        return this.dealerSum;


    }

    clientAmount(){

        this.clientSum = 0;

        for(let i = 0; i<this.clientCards.length; i++){
            if(this.clientCards[i] > 11){

                this.clientSum += 10
            }else{
                this.clientSum += this.clientCards[i];
            }
        }
        return this.clientSum;


    }

    randomCard(){
        //randomly pick one kind of card
        let typeIndex = Math.floor(Math.random() * this.pack.length)
        let randomType = this.pack[typeIndex];
        //randomly pick one card in that type
        let numberIndex = Math.floor(Math.random() * randomType.cards.length)
        let randomNumber = this.pack[typeIndex].cards[numberIndex];
        this.removeItemOnce(this.pack[typeIndex].cards,randomNumber)
        return randomNumber;

    }


    removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }

    findA(){

        for(let i = 0; i < this.clientCards.length; i++){

            if(this.clientCards[i] == 1 | this.clientCards[i] == 11){

                return true;
            }
        }

        return false;
    }

    changeA(){

        for(let i = 0; i < this.clientCards.length; i++){

            if(this.clientCards[i] == 1){

                this.clientCards[i] = 11;
                return;
            }
            if(this.clientCards[i] == 11){
                this.clientCards[i] = 1;
                return;
            }
        }
    }




}

