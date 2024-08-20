
const prompt = require('prompt-sync')();

// GLOBAL VARIABLES

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS = {'♠':1000,
    '♣': 1000,
    '♥': 700, 
    '♦': 700,
    '7': 10,
    'JACKPOT': 5
};

const SYMBOLS_VALUES = {
    '♠': 0.6,
    '♣': 0.6,
    '♥': 1.2,
    '♦': 2,
    '7': 5,
    'JACKPOT': 10
};

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

// SPIN

/**
 * Each array in the grid represents a column in the slot machine.
 * Aftwerwards, we need to transpose the grid, so that each array in the grid represents a row (to check if the user won).
*/

const spin = () => {
    // Como só vamos adicionar e retirar símbolos do array, não alterando a referência, podemos declarar como "const"
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS)){
        // console.log(symbol, count);
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    // console.log(symbols)

    const grid = [];

    for(let i = 0; i < COLUMNS; i++){
        grid.push([]);
        const gridSymbols = [...symbols]
        for(let j = 0; j < ROWS; j++){
            // Math.random() -> Either 0 or 1
            const randomIndex = Math.floor(Math.random() * gridSymbols.length);
            const selectedSymbol = gridSymbols[randomIndex];
            grid[i].push(selectedSymbol);
            // Remove the selected symbol from the gridSymbols
            gridSymbols.splice(randomIndex, 1);
        }
    }
    return grid;
}

// TRANSPOSE MATRIX (GRID)

const transpose = (grid) => {
    const rowsGrid = [];
    for(let i = 0; i < ROWS; i++){
        rowsGrid.push([]);
        for(let j = 0; j < COLUMNS; j++){
            rowsGrid[i].push(grid[j][i]);
        }
    }
    return rowsGrid;
}

const prettyPrintRows = (rowsGrid) => {
    for(const row of rowsGrid){
        let rowStr = '';
        for(const [index, symbol] of row.entries()){
            rowStr += symbol;
            if(index < row.length - 1){
                rowStr += ' | ';
            }
        }
        console.log(rowStr);
    }
}

let balance = deposit()
const numLines = numberOfLinesBet()
const betAmount = getBetAmount(balance, numLines)
const slotGrid = spin()
const transposedSlotGrid = transpose(slotGrid)
prettyPrintRows(transposedSlotGrid);