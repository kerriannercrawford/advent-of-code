// --- Day 10: Syntax Scoring ---

// You ask the submarine to determine the best route out of the deep-sea cave, but it only replies:

// Syntax error in navigation subsystem on line: all of them
// All of them?! The damage is worse than you thought. You bring up a copy of the navigation subsystem (your puzzle input).

// The navigation subsystem syntax is made of several lines containing chunks. There are one or more chunks on each line, and chunks contain zero or more other chunks. Adjacent chunks are not separated by any delimiter; if one chunk stops, the next chunk (if any) can immediately start. Every chunk must open and close with one of four legal pairs of matching characters:

// If a chunk opens with (, it must close with ).
// If a chunk opens with [, it must close with ].
// If a chunk opens with {, it must close with }.
// If a chunk opens with <, it must close with >.
// So, () is a legal chunk that contains no other chunks, as is []. More complex but valid chunks include ([]), {()()()}, <([{}])>, [<>({}){}[([])<>]], and even (((((((((()))))))))).

// Some lines are incomplete, but others are corrupted. Find and discard the corrupted lines first.

// A corrupted line is one where a chunk closes with the wrong character - that is, where the characters it opens and closes with do not form one of the four legal pairs listed above.

// Examples of corrupted chunks include (], {()()()>, (((()))}, and <([]){()}[{}]). Such a chunk can appear anywhere within a line, and its presence causes the whole line to be considered corrupted.

// For example, consider the following navigation subsystem:

// [({(<(())[]>[[{[]{<()<>>
// [(()[<>])]({[<{<<[]>>(
// {([(<{}[<>[]}>{[]{[(<()>
// (((({<>}<{<{<>}{[]{[]{}
// [[<[([]))<([[{}[[()]]]
// [{[{({}]{}}([{[{{{}}([]
// {<[[]]>}<{[{[{[]{()[[[]
// [<(<(<(<{}))><([]([]()
// <{([([[(<>()){}]>(<<{{
// <{([{{}}[<[[[<>{}]]]>[]]
// Some of the lines aren't corrupted, just incomplete; you can ignore these lines for now. The remaining five lines are corrupted:

// {([(<{}[<>[]}>{[]{[(<()> - Expected ], but found } instead.
// [[<[([]))<([[{}[[()]]] - Expected ], but found ) instead.
// [{[{({}]{}}([{[{{{}}([] - Expected ), but found ] instead.
// [<(<(<(<{}))><([]([]() - Expected >, but found ) instead.
// <{([([[(<>()){}]>(<<{{ - Expected ], but found > instead.
// Stop at the first incorrect closing character on each corrupted line.

// Did you know that syntax checkers actually have contests to see who can get the high score for syntax errors in a file? It's true! To calculate the syntax error score for a line, take the first illegal character on the line and look it up in the following table:

// ): 3 points.
// ]: 57 points.
// }: 1197 points.
// >: 25137 points.
// In the above example, an illegal ) was found twice (2*3 = 6 points), an illegal ] was found once (57 points), an illegal } was found once (1197 points), and an illegal > was found once (25137 points). So, the total syntax error score for this file is 6+57+1197+25137 = 26397 points!

// Find the first illegal character in each corrupted line of the navigation subsystem. What is the total syntax error score for those errors?

// VALID CHUNKS
// ()
// []
// ([]), {()()()}, <([{}])>
// [<>({}){}[([])<>]]

// CORRUPTED CHUNKS
//(]
// {()()()>
// (((()))}
// <([]){()}[{}])

// A line can be either incomplete or corrupted 

// Handling lines individually 
// Lines are composed of any number of chunks (one or more)
// Chunks can contain chunks (zero or more)
// If one chunk stops, next chunk starts

// Valid OPENING AND CLOSING 
const validChars = {
	'{': '}',
	'(': ')',
	'[': ']',
	'<': '>'
}

const fs = require('fs');
const rawData = fs.readFileSync('data/submarine-navigation');
const subSystem = rawData.toString().split('\n')
// const subSystem = [
// 	'[({(<(())[]>[[{[]{<()<>>',
// 	'[(()[<>])]({[<{<<[]>>(',
// 	'{([(<{}[<>[]}>{[]{[(<()>',
// 	'(((({<>}<{<{<>}{[]{[]{}',
// 	'[[<[([]))<([[{}[[()]]]',
// 	'[{[{({}]{}}([{[{{{}}([]',
// 	'{<[[]]>}<{[{[{[]{()[[[]',
// 	'[<(<(<(<{}))><([]([]()',
// 	'<{([([[(<>()){}]>(<<{{',
// 	'<{([{{}}[<[[[<>{}]]]>[]]',
// ];

const corruptedCharacters = [];
const finalScores = [];

const scoreRow = (endChars) => {
	let score = 0;
	for (let j = endChars.length - 1; j >= 0; j -= 1) {
		score *= 5;
		const char = endChars[j];
		if (char === ')') {
			score += 1;
		} else if (char === ']') {
			score += 2;
		} else if (char === '}') {
			score += 3;
		} else if (char === '>') {
			score += 4;
		}
	}
	return parseInt(score)
}

// Iterate over each character in string
for (let i = 0; i < subSystem.length; i += 1) {
	const navigationRow = subSystem[i];
	// Initialize an array to contain the end chars we are looking for 
	const endChars = [];
	let charIndex = 0;
	let corruptedRow = false;

	while (charIndex < navigationRow.length && !corruptedRow) {
		const currentChar = navigationRow[charIndex];
		// if current char is an opening char, push the matching closing char to the end of array
		if (Object.keys(validChars).includes(currentChar)) {
			endChars.push(validChars[currentChar]);
		} else if (Object.values(validChars).includes(currentChar)) {
			// if the current char is a closing char, pop the closing char from end of array and match. if corrupted, push to corrupted array
			const endChar = endChars.pop();
			if (endChar !== currentChar) {
				corruptedCharacters.push(currentChar);
				corruptedRow = true;
			}
		}
		charIndex += 1;
	}

	if (!corruptedRow) {
		finalScores.push(scoreRow(endChars));
	}
}

const findWinner = (scores) => {
	const sortedScores = scores.sort((a, b) => a - b);
	return sortedScores[Math.round((scores.length - 1) / 2)]
}

console.log(findWinner(finalScores))
// // Keep a sum 
// const closingCharCount = finalRows.reduce((cache, currentChar) => {
// 	cache[currentChar] = cache[currentChar] ? cache[currentChar] += 1 : 1
// 	return cache;
// }, {})

// const keys = Object.keys(corruptedCharCount);
// let syntaxScore = 0;
// for (let i = 0; i < keys.length; i += 1) {
// 	const char = keys[i]
// 	if (char === '}') {
// 		syntaxScore += (corruptedCharCount[char] * 1197)
// 	} else if (char === ')') {
// 		syntaxScore += (corruptedCharCount[char] * 3)
// 	} else if (char === ']') {
// 		syntaxScore += (corruptedCharCount[char] * 57)
// 	} else if (char === '>') {
// 		syntaxScore += (corruptedCharCount[char] * 25137)
// 	}
// }

// console.log(syntaxScore)