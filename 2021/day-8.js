// --- Day 8: Seven Segment Search ---

// You barely reach the safety of the cave when the whale smashes into the cave mouth, collapsing it. Sensors indicate another exit to this cave at a much greater depth, so you have no choice but to press on.

// As your submarine slowly makes its way through the cave system, you notice that the four-digit seven-segment displays in your submarine are malfunctioning; they must have been damaged during the escape. You'll be in a lot of trouble without them, so you'd better figure out what's wrong.

// Each digit of a seven-segment display is rendered by turning on or off any of seven segments named a through g:

//   0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
//  ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

//   5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg
// So, to render a 1, only segments c and f would be turned on; the rest would be off. To render a 7, only segments a, c, and f would be turned on.

// The problem is that the signals which control the segments have been mixed up on each display. The submarine is still trying to display numbers by producing output on signal wires a through g, but those wires are connected to segments randomly. Worse, the wire/segment connections are mixed up separately for each four-digit display! (All of the digits within a display use the same connections, though.)

// So, you might know that only signal wires b and g are turned on, but that doesn't mean segments b and g are turned on: the only digit that uses two segments is 1, so it must mean segments c and f are meant to be on. With just that information, you still can't tell which wire (b/g) goes to which segment (c/f). For that, you'll need to collect more information.

// For each display, you watch the changing signals for a while, make a note of all ten unique signal patterns you see, and then write down a single four digit output value (your puzzle input). Using the signal patterns, you should be able to work out which pattern corresponds to which digit.

// For example, here is what you might see in a single entry in your notes:

// acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
// cdfeb fcadb cdfeb cdbaf
// (The entry is wrapped here to two lines so it fits; in your notes, it will all be on a single line.)

// Each entry consists of ten unique signal patterns, a | delimiter, and finally the four digit output value. Within an entry, the same wire/segment connections are used (but you don't know what the connections actually are). The unique signal patterns correspond to the ten different ways the submarine tries to render a digit using the current wire/segment connections. Because 7 is the only digit that uses three segments, dab in the above example means that to render a 7, signal lines d, a, and b are on. Because 4 is the only digit that uses four segments, eafb means that to render a 4, signal lines e, a, f, and b are on.

// Using this information, you should be able to work out which combination of signal wires corresponds to each of the ten digits. Then, you can decode the four digit output value. Unfortunately, in the above example, all of the digits in the output value (cdfeb fcadb cdfeb cdbaf) use five segments and are more difficult to deduce.

// For now, focus on the easy digits. Consider this larger example:

// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
// fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
// fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
// cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
// efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
// gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
// gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
// cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
// ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
// gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
// fgae cfgab fg bagce
// Because the digits 1, 4, 7, and 8 each use a unique number of segments, you should be able to tell which combinations of signals correspond to those digits. Counting only digits in the output values (the part after | on each line), in the above example, there are 26 instances of digits that use a unique number of segments (highlighted above).

// In the output values, how many times do digits 1, 4, 7, or 8 appear?

// Display is 4 digits and each digit of a 7 segment display is rendered by turning on or off any of seven segments named a - g
// Each digit in a 4 digit display can be any one of 10 numbers. (0 - 9)
// Each digit is made up of 7 SEGMENTS (so: a b c d e f g segments make up the number eight)
// Signals are randomly set up for each digit. Puzzle input is a 10 digit segment pattern for numbers 0 - 9 in order. 

const fs = require('fs');
const rawData = fs.readFileSync('data/submarine-display');
const parsedData = rawData.toString().split(/\n/);

const input = [
	'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
	// 'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
	// 'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
	// 'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
	// 'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
	// 'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
	// 'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
	// 'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
	// 'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
	// 'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
];

const searchDigits = [
	{ count: 0, positions: [0, 1, 2, 4, 5, 6] }, 
	{ count: 0, positions: [2, 5] },
	{ count: 0, positions: [0, 2, 3, 4, 6] },
	{ count: 0, positions: [0, 2, 3, 5, 6] },
	{ count: 0, positions: [0, 2, 3, 5] },
	{ count: 0, positions: [0, 1, 3, 5, 6] },
	{ count: 0, positions: [0, 1, 3, 4, 5, 6] },
	{ count: 0, positions: [0, 2, 5] },
	{ count: 0, positions: [0, 1, 2, 3, 4, 5, 6] },
	{ count: 0, positions: [0, 1, 2, 3, 5, 6] }
]

const setDigitsObject = (digits) => {

}

const handleData = (output) => {
	const splitData = output.split(' | ').map(input => input.split(' '));
	return {
		signalOutput: splitData[0],
		display: splitData[1]
	};
};

const setACF = (one, seven) => {
	const sevenArr = seven.split('');

	for (let i = 0; i < sevenArr.length; i += 1) {
		if (!one.includes(sevenArr[i])) { 
			a = sevenArr[i]
		} else {
			c = c ? c + sevenArr[i] : sevenArr[i]
			f = f ? f + sevenArr[i] : sevenArr[i]
		}
	}
};

const setBD = (four) => {
	const fourArr = four.split('');
	for (let i = 0; i < fourArr.length; i += 1) {
		if (!c.includes(fourArr[i])) {
			b = b ? b + fourArr[i] : fourArr[i];
			d = d ? d + fourArr[i] : fourArr[i];
		}
	}
};

const setEG = (eight) => {
	const eightArr = eight.split('');
	for (let i = 0; i < eightArr.length; i += 1) {
		if (eightArr[i] !== a && !b.includes(eightArr[i]) && !c.includes(eightArr[i])) {
			e = e ? e + eightArr[i] : eightArr[i];
			g = g ? g + eightArr[i] : eightArr[i];
		}
	}
}

const generatePermutations = (alpha) => {
	const { a, b, c, d, e, f, g } = alpha;
	
	// set a boolean - unique 8 
	let unique8 = false;

	while (!unique8) {
		const combos = [];
		// Start with all combos of B D
		for (let i = 0; i < b.length; i += 1) {
			const oppositeI = i === 0 ? 1 : 0;
			// And then all combos of C F
			for (let j = 0; j < c.length; j += 1) {
				const oppositeJ = j === 0 ? 1 : 0;
				// And finally all combos of E G 
				for (let k = 0; k < e.length; k += 1) {
					const oppositeK = k === 0 ? 1 : 0;
					combos.push(`${a}${b[i]}${c[j]}${d[oppositeI]}${e[k]}${f[oppositeJ]}${g[oppositeK]}`)
				}
			}
		}
		console.log(combos)
		unique8 = true;
	}
}

const data = [];

input.forEach(output => {
	data.push(handleData(output));
});

let a, b, c, d, e, f, g;
const decipherDigit = (digits) => {
	const digit = Object.keys(digits);
	// 1, 4, 7, 8 = digit 
	setACF(digits[digit[0]], digits[digit[2]]);
	setBD(digits[digit[1]]);
	setEG(digits[digit[3]]);

	const permutations = generatePermutations({ a, b, c, d, e, f, g})
}

// record - signalOutput & display
data.forEach(record => {
	const digits = {}; 
	const digitLayout = ['', '', '', '', '', '', ''];
	for (let i = 0; i < record.signalOutput.length; i += 1) {
		// Check length of record, if it matches one of 1/4/7/8 set digits object
		const signalOutput = record.signalOutput[i];
		if (signalOutput.length === searchDigits[1].positions.length) {
			digits[1] = signalOutput;
		} else if (signalOutput.length === searchDigits[4].positions.length) {
			digits[4] = signalOutput;
		} else if (signalOutput.length === searchDigits[7].positions.length) {
			digits[7] = signalOutput;
		} else if (signalOutput.length === searchDigits[8].positions.length) {
			digits[8] = signalOutput;
		}
	}
	decipherDigit(digits)

	console.log(digits)
});



// const totalDigits = Object.values(searchDigits).reduce((sum, currentDigit) => {
// 	return sum += currentDigit.count;
// }, 0)

// console.log(totalDigits)