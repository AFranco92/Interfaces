class Player {
	constructor(turn) {
		this.turn = turn;
	}
}

Player.prototype.isHisTurn = function() {
	return this.turn = true;
}

Player.prototype.isNotHisTurn = function() {
	return this.turn = false;
}