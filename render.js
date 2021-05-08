import Game from "./game.js";

export const create = function (game) {
    let winMessage = "";
    if (game.dealerWon == true) {
        winMessage = "dealer wins"
    }
    if (game.dealerWon == false && game.clientWon == true) {

        winMessage = "You win"
    }
    return `
    <div id="dealerSum">Dealer: ${game.dealerAmount()}</div>

    <div id = "dealerCards">
    </div>

    <div id="clientSum">You: ${game.clientAmount()}</div>

    <div id = "clientCards">
        
    </div>
    
    <div class = "buttons">
    <button type="button"  class = "hit">hit</button>

    <button type="button"  class = "stand">stand</button>
 
    <button type="button"  class = "reset">reset</button>

    <button type="button"  class = "changeA">change A's value</button>
    </div>

    <div id = "message">
    ${winMessage}
    </div>

    `

}


export const renderCard = function (number) {
    if (number == 14) {
        return `<div class="rectangle">J</div>`
    }
    if (number == 12) {
        return `<div class="rectangle">Q</div>`

    }
    if (number == 13) {
        return `<div class="rectangle">K</div>`
    }
    if (number == 1) {
        return `<div class="rectangle">A</div>`
    }
    return `<div class="rectangle">${number}</div>`

}


export const load = function (game) {

    const $root = $('#root');

    let board = create(game);

    $root.append(board);


    //add cards to dealer
    const $dealerCards = $("#dealerCards")
    for (let i = 0; i < game.dealerCards.length; i++) {
        $dealerCards.append(renderCard(game.dealerCards[i]));
    }
    //add cards to client
    const $clientCards = $("#clientCards")
    for (let i = 0; i < game.clientCards.length; i++) {
        $clientCards.append(renderCard(game.clientCards[i]));

    }


    //add event listener
    $root.on('click', ".hit", function (event) {

        let numb = game.giveClientCards();
        const $clientCards = $("#clientCards");
        $clientCards.append(renderCard(numb));
        const $clientSum = $("#clientSum");
        $clientSum.html(`You: ${game.clientAmount()}`);
        game.clientCheck();
        if (game.gameOver) {
            let obj = $("#message");
            obj.html(`<div id = "message">Your sum is greater than 21. You lose.</div>`);
        }

    });


    $root.on('click', ".stand", function (event) {


        while (game.dealerAmount() < 17) {
            let numb = game.giveDealerCards();
            const $dealerCards = $("#dealerCards");
            $dealerCards.append(renderCard(numb));
            const $dealerSum = $("#dealerSum");
            $dealerSum.html(`Dealer: ${game.dealerAmount()}`);
            if (game.dealerAmount() <= 21 && game.dealerAmount() >= 17) {
                game.dealerCheck();
                if (game.dealerWon) {
                    let obj = $("#message");
                    obj.html(`<div id = "message">Your sum is less than dealer's number. You lose.</div>`);
                } else {
                    let obj = $("#message");
                    obj.html(`<div id = "message">Your sum is larger than dealer's number. You win.</div>`);

                }
                return;
            }
        }

        if (game.dealerAmount() <= 21 && game.dealerAmount() >= 17) {
            game.dealerCheck();
            if (game.dealerWon) {
                let obj = $("#message");
                obj.html(`<div id = "message">Your sum is less than dealer's number. You lose.</div>`);
            } else {
                let obj = $("message");
                obj.html(`<div id = "message">Your sum is larger than dealer's number. You win.</div>`);

            }
            return;
        }
        let obj = $("#message");
        obj.html(`<div id = "message">Dealer sum is greater than 21. You win.</div>`);
        return;
    });

    $root.on('click', ".reset", function (event) {
        game = new Game();
        board = create(game);
        $root.html(board);
        //add cards to dealer
        const $dealerCards = $("#dealerCards")
        for (let i = 0; i < game.dealerCards.length; i++) {
            $dealerCards.append(renderCard(game.dealerCards[i]));
        }
        //add cards to client
        const $clientCards = $("#clientCards")
        for (let i = 0; i < game.clientCards.length; i++) {
            $clientCards.append(renderCard(game.clientCards[i]));

        }

    });

    $root.on('click', ".changeA", function (event) {
        if (game.findA()) {
            game.changeA();
            const $clientSum = $("#clientSum");
            $clientSum.html(`You: ${game.clientAmount()}`);    
        } else { return; }

    });

}


$(function () {
    let game = new Game();
    load(game);
});

