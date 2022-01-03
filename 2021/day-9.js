// --- Day 9: Smoke Basin ---

// These caves seem to be lava tubes. Parts are even still volcanically active; small hydrothermal vents release smoke into the caves that slowly settles like rain.

// If you can model how the smoke flows through the caves, you might be able to avoid it and be that much safer. The submarine generates a heightmap of the floor of the nearby caves for you (your puzzle input).

// Smoke flows to the lowest point of the area it's in. For example, consider the following heightmap:

// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// Each number corresponds to the height of a particular location, where 9 is the highest and 0 is the lowest a location can be.

// Your first goal is to find the low points - the locations that are lower than any of its adjacent locations. Most locations have four adjacent locations (up, down, left, and right); locations on the edge or corner of the map have three or two adjacent locations, respectively. (Diagonal locations do not count as adjacent.)

// In the above example, there are four low points, all highlighted: two are in the first row (a 1 and a 0), one is in the third row (a 5), and one is in the bottom row (also a 5). All other locations on the heightmap have some lower adjacent location, and so are not low points.

// The risk level of a low point is 1 plus its height. In the above example, the risk levels of the low points are 2, 1, 6, and 6. The sum of the risk levels of all low points in the heightmap is therefore 15.

// Find all of the low points on your heightmap. What is the sum of the risk levels of all low points on your heightmap?

// const lavaTubes = [
// 	'2199943210',
// 	'3987894921',
// 	'9856789892',
// 	'8767896789',
// 	'9899965678',
// ];

const fs = require('fs');
const rawData = fs.readFileSync('data/lava-tubes');
const lavaTubes = rawData.toString().split('\n')

const createSearchIndices = (tubeIndex, heightIndex, tubeLength, heightLength) => {
	const indices = {
		up: tubeIndex - 1,
		down: tubeIndex + 1,
		left: heightIndex - 1,
		right: heightIndex + 1
	};
	const directionKeys = Object.keys(indices);
	return directionKeys.reduce((cache, direction) => {
		if ((direction === 'up' && indices[direction] >= 0) || 
			(direction === 'down' && indices[direction] < tubeLength) || 
			(direction === 'left' && indices[direction] >= 0) || 
			(direction === 'right' && indices[direction] < heightLength)
		) {
			cache[direction] = indices[direction]
		} 
		return cache
	}, {})
}

const parsePositions = (data) => {
	const positions = {};
	for (let i = 0; i < data.length; i += 1) {
		// tube string = lavaTubes[i]
		for (let j = 0; j < data[i].length; j += 1) {
			positions[`${i}-${j}`] = createSearchIndices(i, j, data.length, data[i].length)
		}
	}
	return positions
}

const findLowPoints = () => {
	const positions = parsePositions(lavaTubes);
	const positionKeys = Object.keys(positions).map(position => {
		return {
			key: position,
			indices: position.split('-'),
		}
	})
	console.log(positionKeys)
	let riskLevel = 0;
	// console.log(positionKeys)
	for (let i = 0; i < positionKeys.length; i += 1) {
		let lowPoint = true;
		const directions = positions[positionKeys[i].key];
		const [tubeIndex, heightIndex] = positionKeys[i].indices;
		const currentHeight = parseInt(lavaTubes[tubeIndex][heightIndex]);

		for (const direction in directions) {
			const searchIndex = directions[direction];
			if ((direction === 'up' || direction === 'down') && !(parseInt(lavaTubes[searchIndex][heightIndex]) > currentHeight)) {
				lowPoint = false;
			} else if ((direction === 'left' || direction === 'right') && !(parseInt(lavaTubes[tubeIndex][searchIndex]) > currentHeight)) {
				lowPoint = false;
			}
		}
		if (lowPoint) {
			riskLevel += parseInt(currentHeight + 1)
		}
	}
	console.log(riskLevel)
}

findLowPoints()
