
const prompt = require('prompt-sync')();

// DEPOSIT MONEY

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