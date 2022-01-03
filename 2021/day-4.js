// --- Day 4: Giant Squid ---

// You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.

// Maybe it wants to play bingo?

// Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

// The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

// 7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7
// After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

// 22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
//  8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
// 21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
//  6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
//  1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
// After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

// 22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
//  8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
// 21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
//  6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
//  1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
// Finally, 24 is drawn:

// 22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
//  8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
// 21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
//  6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
//  1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
// At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

// The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.

// To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?

const fs = require('fs');
const rawBingoBoards = await fs.promises.readFile('data/bingo.txt');
const rawBingoDraw = await fs.promises.readFile('data/bingo-draw');
const bingoBoards = rawBingoBoards.toString().split(/\n/);
const bingoDraw = rawBingoDraw.toString().split(',');

const parseBingoBoards = (boards) => {
	const parsedBoards = [];
	let board = [];

	for (let i = 0; i < boards.length; i += 1) {
		const currentBoard = boards[i];

		if (currentBoard) {
			const rowValues = currentBoard.split(' ').filter(value => value !== '').map(value => {
				return { value, called: false }
			});
			board.push(rowValues);
		} else {
			parsedBoards.push(board);
			board = [];
		}
	}
	if (board.length > 0) {
		parsedBoards.push(board);
	}
	return parsedBoards
}

const parsedBoards = parseBingoBoards(bingoBoards);
const testBoard = parsedBoards[0];

const checkBoardForWin = (board) => {
	// CHECKS FOR HORIZONTAL WINS
	if (board[0][0].called === true &&
		board[0][1].called === true &&
		board[0][2].called === true &&
		board[0][3].called === true &&
		board[0][4].called === true) {
			return true
		} else if (board[1][0].called === true &&
		board[1][1].called === true &&
		board[1][2].called === true &&
		board[1][3].called === true &&
		board[1][4].called === true) {
			return true
		} else if (board[2][0].called === true &&
		board[2][1].called === true &&
		board[2][2].called === true &&
		board[2][3].called === true &&
		board[2][4].called === true) {
			return true
		} else if (board[3][0].called === true &&
		board[3][1].called === true &&
		board[3][2].called === true &&
		board[3][3].called === true &&
		board[3][4].called === true) {
			return true
		} else if (board[4][0].called === true &&
		board[4][1].called === true &&
		board[4][2].called === true &&
		board[4][3].called === true &&
		board[4][4].called === true) {
			return true
		} 
		// CHECK FOR VERTICAL WINS
		else if (board[0][0].called === true &&
		board[1][0].called === true &&
		board[2][0].called === true &&
		board[3][0].called === true &&
		board[4][0].called === true) {
			return true
		} else if (board[0][1].called === true &&
		board[1][1].called === true &&
		board[2][1].called === true &&
		board[3][1].called === true &&
		board[4][1].called === true) {
			return true
		} else if (board[0][2].called === true &&
		board[1][2].called === true &&
		board[2][2].called === true &&
		board[3][2].called === true &&
		board[4][2].called === true) {
			return true
		} else if (board[0][3].called === true &&
		board[1][3].called === true &&
		board[2][3].called === true &&
		board[3][3].called === true &&
		board[4][3].called === true) {
			return true
		} else if (board[0][4].called === true &&
		board[1][4].called === true &&
		board[2][4].called === true &&
		board[3][4].called === true &&
		board[4][4].called === true) {
			return true
		} else {
			return false
		}
}

const checkBoardForNumber = (board, number) => {
	board.forEach(row => {
		for (let i = 0; i < row.length; i += 1) {
			if (row[i].value === number) {
				row[i].called = true;
			}
		}
	})
	return board;
}

const calculateWinningScore = (board, finalValue) => {
	return board.reduce((sum, row) => {
		return sum += row.reduce((sum, value) => {
			if (value.called === false) {
				sum += parseInt(value.value);
			}
			return sum;
		}, 0)
	}, 0) * finalValue
}

const playBingo = (boards, draws) => {
	let playing = true;
	const remainingDraws = draws;
	let winningBoard;
	let finalValue;

	while (playing && remainingDraws.length > 0 && !winningBoard) {
		const value = remainingDraws.shift();
		for (let i = 0; i < boards.length; i += 1) {
			const newBoard = checkBoardForNumber(boards[i], value);
			const winner = checkBoardForWin(newBoard);
			boards[i] = newBoard;
			if (winner) {
				finalValue = value;
				winningBoard = boards[i];
				playing = false;
			}
		}
	}
	console.log(calculateWinningScore(winningBoard, finalValue))
	return winningBoard;
}

playBingo(parsedBoards, bingoDraw)