let canvas0 = document.getElementById('canvas0');
let canvas1 = document.getElementById('canvas1');
let canvas2 = document.getElementById('canvas2');

let ctx0 = canvas0.getContext('2d');
let ctx01 = canvas1.getContext('2d');
let ctx1 = canvas1.getContext('2d');
let ctx2 = canvas2.getContext('2d');
let redchips = [];
let yellowchips = [];

let chipsnumber = 4;

let isthereawinner = false;

let movingred, movingyellow;

let redchipsputted = 1; 
let yellowchipsputted = 1;

let redturn = true;
let yellowturn = false;

class Board {
	constructor(xmaxchips, ymaxchips, chipsize, boardmatrix) {
		this.xmaxchips = xmaxchips;
		this.ymaxchips = ymaxchips;
		this.chipsize = chipsize;
		this.boardmatrix = boardmatrix = new Array(xmaxchips);
		this.createBoardMatrix(xmaxchips, ymaxchips, chipsize);
	}
}

Board.prototype.getBoardMatrix = function() {
	return this.boardmatrix;
}

Board.prototype.createBoardMatrix = function(boardmatrix) {
	for(let col = 0; col < this.ymaxchips; col++) {
		this.boardmatrix[col] = new Array(this.xmaxchips);
		for(let row = 0; row < this.xmaxchips; row++){
			this.createHollowChip(this.xmaxchips, this.ymaxchips, this.chipsize, row, col, 'black', 'lightgrey');
		}
	}
}

Board.prototype.createHollowChip = function(xmaxchips, ymaxchips, chipsize, row, col, bordercolor, color) {
	ctx1.fillStyle = color;
	ctx1.beginPath();
	ctx1.lineWidth = 7;
	ctx1.arc((canvas1.width/this.xmaxchips)*row+(this.xmaxchips*this.ymaxchips), 
			(canvas1.height/this.ymaxchips)*col+(this.xmaxchips*this.ymaxchips), 
			34.8, 0, Math.PI*2);
	ctx1.strokeStyle = bordercolor;
	ctx1.setLineDash([2.5, 0.5]);
	ctx1.stroke();
	ctx1.fill();
	ctx1.closePath();		
}

Board.prototype.checkHorizontallyL = function(rowdrop, coldrop) {
	if(!isthereawinner) {
		let colour = this.boardmatrix[rowdrop][coldrop].colour;
		let counter = 1;
		while(coldrop >= 0) {
			if(	this.boardmatrix[rowdrop][coldrop-1] != null && 
				this.boardmatrix[rowdrop][coldrop] != null &&
					this.boardmatrix[rowdrop][coldrop].colour === 
					this.boardmatrix[rowdrop][coldrop-1].colour) {
				counter++;
				if(counter == 4) {
					if(colour == 'red') {
						$(".winner1").html("GANADOR");
					}
					if(colour == 'yellow') {
						$(".winner2").html("GANADOR");
					}
					isthereawinner = true;
					$("#canvas0, #canvas2").hide();
					console.log("Chequeado horizontalmente L");
				}
			}
			coldrop--;
		}
	}
}

Board.prototype.checkHorizontallyR = function(rowdrop, coldrop) {
	if(!isthereawinner) {
		let colour = this.boardmatrix[rowdrop][coldrop].colour;
		let counter = 1;
		while(coldrop < this.ymaxchips) {
			if(	this.boardmatrix[rowdrop][coldrop+1] != null && 
				this.boardmatrix[rowdrop][coldrop] != null &&
					this.boardmatrix[rowdrop][coldrop].colour === 
					this.boardmatrix[rowdrop][coldrop+1].colour) {
				counter++;
				if(counter == 4) {
					if(colour == 'red') {
						$(".winner1").html("GANADOR");
					}
					if(colour == 'yellow') {
						$(".winner2").html("GANADOR");
					}
					isthereawinner = true;
					$("#canvas0, #canvas2").hide();
					console.log("Chequeado horizontalmente R");
				}
			}
			coldrop++;
		}
	}
}

Board.prototype.checkVerticallyD = function(rowdrop, coldrop) {
	if(!isthereawinner) {
		let colour = this.boardmatrix[rowdrop][coldrop].colour;
		let counter = 1;
		while(rowdrop < this.xmaxchips) {
			if(	this.boardmatrix[rowdrop+1][coldrop] != null &&
				this.boardmatrix[rowdrop][coldrop] != null &&
					this.boardmatrix[rowdrop][coldrop].colour === 
					this.boardmatrix[rowdrop+1][coldrop].colour) {
				counter++;
				if(counter == 4) {
					if(colour == 'red') {
						$(".winner1").html("GANADOR");
					}
					if(colour == 'yellow') {
						$(".winner2").html("GANADOR");
					}
					isthereawinner = true;
					$("#canvas0, #canvas2").hide();
					console.log("Chequeado verticalmente D");
				}
			}
			rowdrop++;
		}
	}
}

Board.prototype.checkDiagonallyDL = function(rowdrop, coldrop) {
	if(!isthereawinner) {
		let colour = this.boardmatrix[rowdrop][coldrop].colour;
		let counter = 1;
		while(coldrop >= 0) {
			while(rowdrop < this.xmaxchips) {
				if(	this.boardmatrix[rowdrop+1][coldrop-1] != null &&
						this.boardmatrix[rowdrop][coldrop] != null &&
						this.boardmatrix[rowdrop][coldrop].colour === 
						this.boardmatrix[rowdrop+1][coldrop-1].colour) {
					counter++;
				}
				if(counter == 4) {
					if(colour == 'red') {
						$(".winner1").html("GANADOR");
					}
					if(colour == 'yellow') {
						$(".winner2").html("GANADOR");
					}
					isthereawinner = true;
					$("#canvas0, #canvas2").hide();
					console.log("Chequeado diagonalmente DL");
				}
				rowdrop++;
			}
			coldrop--;
		}
	}
}

Board.prototype.checkDiagonallyDR = function(rowdrop, coldrop) {
	if(!isthereawinner) {
		let colour = this.boardmatrix[rowdrop][coldrop].colour;
		let counter = 1;
		while(coldrop < this.ymaxchips) {
			while(rowdrop < this.xmaxchips) {
				if(	this.boardmatrix[rowdrop+1][coldrop+1] != null &&
						this.boardmatrix[rowdrop][coldrop] != null &&
						this.boardmatrix[rowdrop][coldrop].colour === 
						this.boardmatrix[rowdrop+1][coldrop+1].colour) {
					counter++;
				}
				if(counter == 4) {
					if(colour == 'red') {
						$(".winner1").html("GANADOR");
					}
					if(colour == 'yellow') {
						$(".winner2").html("GANADOR");
					}
					isthereawinner = true;
					$("#canvas0, #canvas2").hide();
					console.log("Chequeado diagonalmente DR");
				}
				rowdrop++;
			}
			coldrop++;
		}
	}
}