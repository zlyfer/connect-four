var socket = io();
// socket.emit('event', args);
// socket.on('event', args => {});

var bgchips = [];
var chips = {};
var team;
var fieldsize = 600;
var chipsize = fieldsize / 10;
var gameover = false;
var restrictinput = false; // todo

function preload() {}

function setup() {
	createCanvas(fieldsize, fieldsize);
	team = random(["yellow", "blue"]);

	for (let col = 1; col < 10; col++) {
		for (let row = 1; row < 10; row++) {
			if (!(chips[col])) {
				chips[col] = {};
			}
			chips[col][row] = new Chip(false, row, col, chipsize);
		}
	}
}

function getPos(x) {
	pos = round(x / chipsize);
	return pos;
}

function mousePressed() {
	let col = getPos(mouseX);
	let row = 1;

	if (col >= 1 && col <= 9) {
		let chip = new Chip(team, row, col, chipsize);
		if (chip.isValid(chips)) {
			if (team == "yellow") {
				team = "blue";
			} else {
				team = "yellow";
			}
			chips[col][row] = chip;
		}
	}
}

function win(team, c1, c2) {
	stroke(255, 0, 0);
	strokeWeight(5);
	line(c1.col * c1.size, c1.row * c1.size, c2.col * c2.size, c2.row * c2.size);
	mousePressed = false;
}

function checkWin() {
	for (let row = 1; row < 7; row++) {
		for (let col = 1; col < 10; col++) {
			if (chips[col][row].team == chips[col][row + 1].team && chips[col][row].team == chips[col][row + 2].team && chips[col][row].team == chips[col][row + 3].team && chips[col][row].team) {
				win(chips[col][row].team, chips[col][row], chips[col][row + 3])
				return true;
			}
		}
	}

	for (let row = 1; row < 10; row++) {
		for (let col = 1; col < 7; col++) {
			if (chips[col][row].team == chips[col + 1][row].team && chips[col][row].team == chips[col + 2][row].team && chips[col][row].team == chips[col + 3][row].team && chips[col][row].team) {
				win(chips[col][row].team, chips[col][row], chips[col + 3][row])
				return true;
			}
		}
	}

	for (let row = 1; row < 7; row++) {
		for (let col = 4; col < 10; col++) {
			if (chips[col][row].team == chips[col - 1][row + 1].team && chips[col][row].team == chips[col - 2][row + 2].team && chips[col][row].team == chips[col - 3][row + 3].team && chips[col][row].team) {
				win(chips[col][row].team, chips[col][row], chips[col - 3][row + 3])
				return true;
			}
		}
	}

	for (let row = 4; row < 10; row++) {
		for (let col = 4; col < 10; col++) {
			if (chips[col][row].team == chips[col - 1][row - 1].team && chips[col][row].team == chips[col - 2][row - 2].team && chips[col][row].team == chips[col - 3][row - 3].team && chips[col][row].team) {
				win(chips[col][row].team, chips[col][row], chips[col - 3][row - 3])
				return true;
			}
		}
	}
	return false;
}

function draw() {
	background(200);

	if (team == "yellow") {
		stroke("#FF6F00");
	} else {
		stroke("#1A237E");
	}
	strokeWeight(8);
	noFill();
	rect(4, 4, width - 8, height - 8);

	let change = false;

	for (let col = 1; col < 10; col++) {
		for (let row = 1; row < 10; row++) {
			chip = chips[col][row];
			if (chip.team) {
				if (chip.move(chips)) {
					change = true;
				};
			}
			chip.show();
		}
	}

	if (!(change)) {
		let winner = checkWin();
		if (winner) {
			socket.emit('game end', winner);
		}
	}

}

socket.on('game end', winner => {

});