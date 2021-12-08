// --- Part Two ---

// On the other hand, it might be wise to try a different strategy: let the giant squid win.

// You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its arms, the safe thing to do is to figure out which board will win last and choose that one. That way, no matter which boards it picks, it will win for sure.

// In the above example, the second board is the last to win, which happens after 13 is eventually called and its middle column is completely marked. If you were to keep playing until this point, the second board would have a sum of unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.

// Figure out which board will win last. Once it wins, what would its final score be?

const fs = require('fs');
// const rawBingoBoards = await fs.promises.readFile('data/bingo-sample');
const rawBingoBoards = await fs.promises.readFile('data/bingo.txt');
const rawBingoDraw = await fs.promises.readFile('data/bingo-draw');
const bingoBoards = rawBingoBoards.toString().split(/\n/);
const bingoDraw = rawBingoDraw.toString().split(',');

const parseBingoBoards = (boards) => {
	const parsedBoards = [];
	let board = {
		rows: [],
		columns: [[], [], [], [], []]
	};

	for (let i = 0; i < boards.length; i += 1) {
		const currentBoard = boards[i];
		if (currentBoard) {
			const rowValues = currentBoard.split(' ').filter(value => value !== '');
			rowValues.forEach((_, i) => board.columns[i] = [ ...board.columns[i], _ ]);
			board.rows.push(rowValues);
		} else {
			parsedBoards.push(board);
			board = {
				rows: [],
				columns: [[], [], [], [], []]
			};
		}
	}
	if (board.rows.length > 0) {
		parsedBoards.push(board);
	}
	return parsedBoards
}

const parsedBoards = parseBingoBoards(bingoBoards);
const testBoard = parsedBoards[0];

const markNextValue = (board, target) => {
	const rows = [ ...board.rows ];
	const columns = [ ...board.columns ];

	for (let i = 0; i < board.rows.length; i += 1) {
		const indicesToRemove = [];
		for (let j = 0; j < board.rows.length; j += 1) {
			if (rows[i][j] === target) {
				indicesToRemove.push(j)
			}
		}
		indicesToRemove.forEach(elem => {
			rows[i].splice(elem, 1)
		})
	}

	for (let i = 0; i < board.columns.length; i += 1) {
		const indicesToRemove = [];
		for (let j = 0; j < board.columns.length; j += 1) {
			if (columns[i][j] === target) {
				indicesToRemove.push(j)
			}
		}
		indicesToRemove.forEach(elem => {
			columns[i].splice(elem, 1)
		})
	}

	return {
		rows, columns
	}
}

const checkBoardForWin = (board) => {
	for (let i = 0; i < board.rows.length; i += 1) {
		if (board.rows[i].length === 0) {
			return true
		} 
	}
	for (let i = 0; i < board.columns.length; i += 1) {
		if (board.columns[i].length === 0) {
			return true;
		}
	}
	return false
}

const playBingo = (boards, numbers) => {
	let finalValue;
	let winningBoard;
	const remainingDraws = [ ...numbers ];
	let remainingBoards = [ ...boards ];
	while (remainingDraws.length > 0) {
		let searchValue = remainingDraws.shift();
		for (let i = 0; i < remainingBoards.length; i += 1) {
			remainingBoards[i] = markNextValue(remainingBoards[i], searchValue);
			console.log(remainingBoards[i])
			if (checkBoardForWin(remainingBoards[i])) {
				finalValue = searchValue;
				winningBoard = remainingBoards[i];
				remainingBoards.splice(i, 1)
			}
		}
	}
	console.log(finalValue)
	console.log(winningBoard.rows)
}

playBingo(parsedBoards, bingoDraw)