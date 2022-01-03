// --- Day 11: Dumbo Octopus ---

// You enter a large cavern full of rare bioluminescent dumbo octopuses! They seem to not like the Christmas lights on your submarine, so you turn them off for now.

// There are 100 octopuses arranged neatly in a 10 by 10 grid. Each octopus slowly gains energy over time and flashes brightly for a moment when its energy is full. Although your lights are off, maybe you could navigate through the cave without disturbing the octopuses if you could predict when the flashes of light will happen.

// Each octopus has an energy level - your submarine can remotely measure the energy level of each octopus (your puzzle input). For example:

// 5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526
// The energy level of each octopus is a value between 0 and 9. Here, the top-left octopus has an energy level of 5, the bottom-right one has an energy level of 6, and so on.

// You can model the energy levels and flashes of light in steps. During a single step, the following occurs:

// First, the energy level of each octopus increases by 1.
// Then, any octopus with an energy level greater than 9 flashes. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than 9, it also flashes. This process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)
// Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.

// Before any steps:
// 5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526

// After step 1:
// 6594254334
// 3856965822
// 6375667284
// 7252447257
// 7468496589
// 5278635756
// 3287952832
// 7993992245
// 5957959665
// 6394862637

// After step 2:
// 8807476555
// 5089087054
// 8597889608
// 8485769600
// 8700908800
// 6600088989
// 6800005943
// 0000007456
// 9000000876
// 8700006848

// After step 3:
// 0050900866
// 8500800575
// 9900000039
// 9700000041
// 9935080063
// 7712300000
// 7911250009
// 2211130000
// 0421125000
// 0021119000

// After step 4:
// 2263031977
// 0923031697
// 0032221150
// 0041111163
// 0076191174
// 0053411122
// 0042361120
// 5532241122
// 1532247211
// 1132230211

// After step 5:
// 4484144000
// 2044144000
// 2253333493
// 1152333274
// 1187303285
// 1164633233
// 1153472231
// 6643352233
// 2643358322
// 2243341322

// After step 6:
// 5595255111
// 3155255222
// 3364444605
// 2263444496
// 2298414396
// 2275744344
// 2264583342
// 7754463344
// 3754469433
// 3354452433

// After step 7:
// 6707366222
// 4377366333
// 4475555827
// 3496655709
// 3500625609
// 3509955566
// 3486694453
// 8865585555
// 4865580644
// 4465574644

// After step 8:
// 7818477333
// 5488477444
// 5697666949
// 4608766830
// 4734946730
// 4740097688
// 6900007564
// 0000009666
// 8000004755
// 6800007755

// After step 9:
// 9060000644
// 7800000976
// 6900000080
// 5840000082
// 5858000093
// 6962400000
// 8021250009
// 2221130009
// 9111128097
// 7911119976

// After step 10:
// 0481112976
// 0031112009
// 0041112504
// 0081111406
// 0099111306
// 0093511233
// 0442361130
// 5532252350
// 0532250600
// 0032240000
// After step 10, there have been a total of 204 flashes. Fast forwarding, here is the same configuration every 10 steps:

// Given the starting energy levels of the dumbo octopuses in your cavern, simulate 100 steps. How many total flashes are there after 100 steps?

const dumboOctopuses = [
	'4112256372',
	'3143253712',
	'4516848631',
	'3783477137',
	'3746723582',
	'5861358884',
	'4843351774',
	'2316447621',
	'6643817745',
	'6366815868',
].map(row => row.split('').map(octopus => parseInt(octopus)));

// const dumboOctopuses = [
// 	'5483143223',
// 	'2745854711',
// 	'5264556173',
// 	'6141336146',
// 	'6357385478',
// 	'4167524645',
// 	'2176841721',
// 	'6882881134',
// 	'4846848554',
// 	'5283751526',
// ].map(row => row.split('').map(octopus => parseInt(octopus)));

let indicesToFlash = [];
let flashedIndices = [];

const steps = 250;
let counter = 0;

const increaseEnergy = () => {
	// Increase all energy by iterating over every row and then every column. 
	// If the value > 9, push the index to an array. 
	for (let x = 0; x < dumboOctopuses.length; x += 1) {
		for (let y = 0; y < dumboOctopuses[x].length; y += 1) {
			dumboOctopuses[x][y] += 1;
			if (dumboOctopuses[x][y] > 9) {
				indicesToFlash.push([x, y])
			}
		}
	}
	// Then enter a while loop. While the array of indexes > 0, continue 
	while (indicesToFlash.length > 0) {
		const index = indicesToFlash.shift();
		flashedIndices.push(index);
		// Increase all values adjacent. Increase flashes.
		increaseAdjacent(index)
	}
}

const resetEnergy = () => {
	// After while loop, iterate over flashed indices and if the val > 9, set it to 9
	const flashes = flashedIndices.length;
	console.log(flashes)
	if (flashes === 100) {
		console.log("yes")
		console.log(counter)
	}
	for (let x = 0; x < dumboOctopuses.length; x += 1) {
		for (let y = 0; y < dumboOctopuses[x].length; y += 1) {
			if (dumboOctopuses[x][y] > 9) {
				dumboOctopuses[x][y] = 0;
			}
		}
	}

	return flashes;
}

const increaseAdjacent = ([x, y]) => {
	const coordinates = [
		[x - 1, y], [x + 1, y],
		[x, y - 1], [x, y + 1],
		[x - 1, y - 1],
		[x - 1, y + 1],
		[x + 1, y - 1],
		[x + 1, y + 1],
	].filter(([x, y]) => (x >= 0 && x < 10) && (y >= 0 && y < 10))
	coordinates.forEach(([x, y]) => {
		// Push index to array if val = 10. 
		dumboOctopuses[x][y] += 1
		if (dumboOctopuses[x][y] === 10) {
			let indexAlreadyFlashed = false;
			for (let i = 0; i < flashedIndices.length; i += 1) {
				if (flashedIndices[i][x] && flashedIndices[i][x][y]) {
					console.log('cant flash again')
					indexAlreadyFlashed = true;
				}
			}
			if (!indexAlreadyFlashed) {
				indicesToFlash.push([x, y]);
			}
		}
	})
}

const executeStep = (steps) => {
	let flashes = 0;
	for (let i = 0; i < steps; i += 1) {
		counter += 1;
		increaseEnergy();
		flashes = flashes + resetEnergy();
		indicesToFlash = [];
		flashedIndices = [];
	}
	// Return flashes
	// console.log(flashes)
	return flashes;
}

executeStep(steps)