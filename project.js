
const prompt = require('prompt-sync')();

// DEPOSIT MONEY

/**
 * A deposit should be a positive number, either an integer or a float.
 * If the user enters a negative number, a string, or a number equal to 0, the program should 
 * ask the user to enter a valid amount, on loop, until the user enters a valid amount.
 */

const deposit = () => {
    while(true) {
        const amountStr = prompt('Enter amount to deposit: ');
        // In case the deposit is a "float"
        const normalizedStr = amountStr.replace(',', '.');
        const amount = parseFloat(normalizedStr);
        if(isNaN(amount) || amount <= 0) {
            console.log("Please, enter a valid amount!\n");
        } else {
            console.log(`You have deposited ${amount}€! Have fun and good luck :D\n`);
            return amount;
            break;
        }
        // console.log(!isNaN(amount) && amount > 0 ? `You have deposited ${amount}\n` : "Enter a valid amount!\n");
    }
}

// NUMBER OF LINES TO BET ON

/**
* In a typical slot machine, the player can bet on multiple lines.
* In this case, the number of lines is a positive number between 1 and 3, each representing
* the first line (1), the center line (2) and the last line (3).
*/

const numberOfLinesBet = () => {
    while(true) {
        const linesStr = prompt('How many lines would you like to bet on (1-3)? >> ');
        const lines = parseFloat(linesStr);
        if(isNaN(lines) || lines <= 0 || lines > 3) {
            console.log("Please, enter a valid amount of lines to bet on (1-3)!\n");
        } else {
            console.log(`You have selected ${lines} lines!\n`);
            return lines;
            break;
        }
    }
}

// BET AMOUNT

/**
 * The bet amount should be a positive number, either an integer or a float.
 * The bet amount should be less than or equal to the balance divided by the number of lines (*).
 * (*) -> If the balance is 10€ and the player bets on 3 lines, the maximum bet amount is 10€ / 3 = 3.33€ per line.
 */

const getBetAmount = (balance, numLines) => {
    while(true) {
        const betStr = prompt('Place the amount to bet (per line): ');
        const bet = parseFloat(betStr);

        if(isNaN(bet) || bet <= 0 || bet > (balance / numLines)) {
            console.log("Please, enter a valid amount!\n");
        } else {
            console.log(`You have placed ${bet}€ per line! Let's spin!!!\n`);
            return bet;
            break;
        }
    }
}

let balance = deposit()
const numLines = numberOfLinesBet()
const betAmount = getBetAmount(balance, numLines)