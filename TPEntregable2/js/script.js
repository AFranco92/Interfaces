$(document).ready(function() {

	"use strict";

	let hitsound = new Audio('sounds/hit.mp3');
	hitsound.loop = false;

	let redchipimage = new Image();
	redchipimage.src = './images/redchip.png';
	let yellowchipimage = new Image();
	yellowchipimage.src = './images/yellowchip.png';

	let canvas0 = document.getElementById('canvas0');
	let canvas1 = document.getElementById('canvas1');
	let canvas2 = document.getElementById('canvas2');
	let ctx0 = canvas0.getContext('2d');
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

    // let intromusic = document.getElementById("intromusic");
    // intromusic.volume = 0.1;

	//$(".container").hide();
	$(".restart").hide();
	$(".rules").hide();

	$(".torules").click(function() {
		$(".rules").fadeIn(300);		
	});

	$(".play").click(function() {
		let vol = 0.1;
		let interval = 200;
		let fadeout = setInterval(function() {
		    if (vol > 0) {
		      	vol -= 0.05;
		      	intromusic.volume = vol;
		    }
		    else {
		      	clearInterval(fadeout);
		    }
		 }, interval);
		$(".welcome").fadeOut(300);
		$(".container, .restart").fadeIn(2300);
	});

	$(".quantredchips, .quantyellowchips").html(chipsnumber);
	$(".redwinsnumber, .yellowwinsnumber").html(0);
	$(".gamenumber").html(1);

	class Board {
		constructor(xmaxchips, ymaxchips, chipsize, boardmatrix) {
			this.xmaxchips = xmaxchips;
			this.ymaxchips = ymaxchips;
			this.chipsize = chipsize;
			this.boardmatrix = boardmatrix = new Array(xmaxchips);
			this.createBoardMatrix(xmaxchips, ymaxchips, chipsize);
		}
	}

	class Player {
		constructor(chipsbundle) {
			this.chipsbundle = new Array(chipsnumber);
			this.chipsbundle = chipsbundle;
		}
	}

	class Chip {
		constructor(posX, posY, radio, draggable, colour) {
			this.posX = posX;
			this.posY = posY;
			this.radio = radio;
			this.draggable = draggable;
			this.colour = colour;
		}
	}

	canvas0.addEventListener("mousedown", function(e) {
        redchip.clicked(e);
	});
	canvas0.addEventListener("mousemove", function(e) {
	    redchip.redmoving(e);
	});
	canvas0.addEventListener("mouseup", function(e) {
	    redchip.redup(e);
	});

	canvas0.addEventListener("mouseout", function(e) {
	    redchip.redup(e);
	});

	canvas1.addEventListener("mouseup", function(e) {
		redchip.redchipdropped(e);
		yellowchip.yellowchipdropped(e);
	});

	canvas2.addEventListener("mousedown", function(e) {
        yellowchip.clicked(e);
	});
	canvas2.addEventListener("mousemove", function(e) {
	    yellowchip.yellowmoving(e);
	});
	canvas2.addEventListener("mouseup", function(e) {
	    yellowchip.yellowup(e);
	});
	canvas2.addEventListener("mouseout", function(e) {
	    yellowchip.yellowup(e);
	});

	Board.prototype.createChips = function() {
		for(let i = 0; i < chipsnumber; i++) {
			redchips.push(redchip);
			yellowchips.push(yellowchip);
			redchips[i].drawChips(ctx0, redchipimage);
			yellowchips[i].drawChips(ctx2, yellowchipimage);
		}
	}

	Board.prototype.getBoardMatrix = function() {
		return this.boardmatrix;
	}

	Board.prototype.createBoardMatrix = function(xmaxchips, ymaxchips, chipsize, boardmatrix) {
		for(let col = 0; col < ymaxchips; col++) {
			this.boardmatrix[col] = new Array(xmaxchips);
			for(let row = 0; row < xmaxchips; row++){
				this.boardmatrix[col][row] = this.createHollowChip(xmaxchips, ymaxchips, chipsize, row, col, 'black', '#CDBBBB');
			}
		}
	}

	Board.prototype.createHollowChip = function(xmaxchips, ymaxchips, chipsize, row, col, bordercolor, color) {
		ctx1.fillStyle = color;
		ctx1.strokeStyle = bordercolor;
		ctx1.stroke();
		ctx1.beginPath();
		ctx1.arc((canvas1.width/xmaxchips)*row+(xmaxchips*ymaxchips), 
				(canvas1.height/ymaxchips)*col+(xmaxchips*ymaxchips), 
				34.8, 0, Math.PI*2);
		ctx1.fill();
		ctx1.closePath();		
	}

	Board.prototype.checkHorizontallyL = function(rowdrop, coldrop) {
		if(!isthereawinner) {
			let colour = this.boardmatrix[rowdrop][coldrop].colour;
			let counter = 1;
			while(coldrop >= 0) {
				if(	this.boardmatrix[rowdrop][coldrop-1] != null && 
						this.boardmatrix[rowdrop][coldrop].colour == 
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
					}
				}
				coldrop--;
			}
		}
	}

	Board.prototype.checkHorizontallyR = function(rowdrop, coldrop, colour, neighbourcolor) {
		let counter = 1;
		while(!isthereawinner && coldrop >= 0) {
			while(	this.boardmatrix[rowdrop][coldrop-2] != null && 
					colour == 'red') {
				counter++;
			}
			if(counter == 4) {
				alert("¡Ganador!");
				isthereawinner = true;
			}
			coldrop--;
		}
	}

	Board.prototype.checkVerticallyU = function() {
		if(!isthereawinner) {
			let row = this.boardmatrix[row];
			let col = this.boardmatrix[col];
			let counter = 1;
			while(row >= 0) {
				while(	this.boardmatrix[row-1][col] != null && 
						this.boardmatrix[row][col].color == this.boardmatrix[row-1][col].color) {
					counter++;
				}
				if(counter == 4) {
					alert("¡Ganador!");
					isthereawinner = true;
				}
				row--;
			}
			if(counter < 4) {
				this.checkVerticallyD();
			}
		}
	}

	Board.prototype.checkVerticallyD = function() {
		let row = this.boardmatrix[row];
		let col = this.boardmatrix[col];
		let counter = 1;
		while(row < xmaxchips) {
			while(	this.boardmatrix[row+1][col] != null && 
					this.boardmatrix[row][col].color == this.boardmatrix[row+1][col].color) {
				counter++;
			}
			if(counter == 4) {
				alert("¡Ganador!");
				isthereawinner = true;
			}
			row++;
		}
	}

	Board.prototype.checkDiagonallyUR = function() {
		if(!isthereawinner) {
			let row = this.boardmatrix[row];
			let col = this.boardmatrix[col];
			let counter = 1;
			while(row >= 0) {
				while(col < ymaxchips) {
					while(	this.boardmatrix[row-1][col+1] != null && 
							this.boardmatrix[row][col].color == this.boardmatrix[row-1][col+1].color) {
						counter++;
					}
					if(counter == 4) {
						alert("¡Ganador!");
						isthereawinner = true;
					}
					col++;
				}
				row--;
			}
			if(counter < 4) {
				this.checkDiagonallyDL();
			}
		}
	}

	Board.prototype.checkDiagonallyDL = function() {
		let row = this.boardmatrix[row];
		let col = this.boardmatrix[col];
		let counter = 1;
		while(row < xmaxchips) {
			while(col >= 0) {
				while(	this.boardmatrix[row+1][col-1] != null && 
						this.boardmatrix[row][col].color == this.boardmatrix[row+1][col-1].color) {
					counter++;
				}
				if(counter == 4) {
					alert("¡Ganador!");
					isthereawinner = true;
				}
				col--;
			}
			row++;
		}
	}

	Board.prototype.checkDiagonallyDR = function() {
		if(!isthereawinner) {
			let row = this.boardmatrix[row];
			let col = this.boardmatrix[col];
			let counter = 1;
			while(row < xmaxchips) {
				while(col < ymaxchips) {
					while(	this.boardmatrix[row+1][col+1] != null && 
							this.boardmatrix[row][col].color == this.boardmatrix[row+1][col+1].color) {
						counter++;
					}
					if(counter == 4) {
						alert("¡Ganador!");
						isthereawinner = true;
					}
					col++;
				}
				row++;
			}
			if(counter < 4) {
				this.checkDiagonallyUL();
			}
		}
	}

	Board.prototype.checkDiagonallyUL = function() {
		let row = this.boardmatrix[row];
		let col = this.boardmatrix[col];
		let counter = 1;
		while(row >= 0) {
			while(col >= 0) {
				while(	this.boardmatrix[row-1][col-1] != null && 
						this.boardmatrix[row][col].color == this.boardmatrix[row-1][col-1].color) {
					counter++;
				}
				if(counter == 4) {
					alert("¡Ganador!");
					isthereawinner = true;
				}
				col--;
			}
			row--;
		}
	}

	Chip.prototype.getColour = function() {
		return this.colour;
	}

	Chip.prototype.drawChip = function (ctx, imagen) {
		this.radio = 34.8;
		ctx.beginPath();
		let image = ctx.createPattern(imagen, 'repeat');
		ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
		ctx.fillStyle = image;
		ctx.fill();
		ctx.closePath();
		ctx.drawImage(imagen, this.posX - this.radio, this.posY - this.radio, this.radio*2 , this.radio*2.1);
	}

	Chip.prototype.drawChips = function (ctx, imagen) {
		for(let i = 0; i < chipsnumber; i++) {
			this.radio = 34.8;
			ctx.beginPath();
			let image = ctx.createPattern(imagen, 'repeat');
			ctx.arc(this.posX*i, this.posY*i, this.radio, 0, Math.PI*2);
			ctx.fillStyle = image;
			ctx.fill();
			ctx.closePath();
			ctx.drawImage(imagen, this.posX - this.radio, this.posY - this.radio, this.radio*2 , this.radio*2.1);
		}
	}

	Chip.prototype.dropChip = function (ctx, imagen, rowdrop, coldrop, colour) {
		if(coldrop == 0) {
			this.posX = 42.5;
		}
		if(coldrop == 1) {
			this.posX = 127.5;
		}
		if(coldrop == 2) {
			this.posX = 212.5;
		}
		if(coldrop == 3) {
			this.posX = 297.5;
		}
		if(coldrop == 4) {
			this.posX = 382.5;
		}
		if(coldrop == 5) {
			this.posX = 467.5;
		}

		if(rowdrop == 0) {
			this.posY = 41.42;
		}
		if(rowdrop == 1) {
			this.posY = 123.92;
		}
		if(rowdrop == 2) {
			this.posY = 206.42;
		}
		if(rowdrop == 3) {
			this.posY = 288.92;
		}
		if(rowdrop == 4) {
			this.posY = 371.42;
		}
		if(rowdrop == 5) {
			this.posY = 453.92;
		}
		if(rowdrop == 6) {
			this.posY = 536.42;
		}
		this.radio = 34.8;
		ctx.beginPath();
		let image = ctx.createPattern(imagen, 'repeat');
		ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
		ctx.fillStyle = image;
		ctx.fill();
		ctx.closePath();
		let boardmatrix = board1.getBoardMatrix();
		console.log(rowdrop, coldrop);
		console.log(boardmatrix);
		if(boardmatrix[rowdrop][coldrop] == null) {
			boardmatrix[rowdrop][coldrop] = new Chip(this.posX, this.posY, this.radio, false, colour);
			ctx.drawImage(imagen, this.posX - this.radio, this.posY - this.radio, this.radio*2 , this.radio*2.1);
		}
		if(boardmatrix[rowdrop][coldrop] != null && redchipsputted > 3 || yellowchipsputted > 3) {
			board1.checkHorizontallyL(rowdrop, coldrop);
		}
	}

	Chip.prototype.clicked = function(e) {
		console.log("Color de la ficha: "+this.colour);
		let cX = e.layerX;
		let cY = e.layerY;
		let firstparam = Math.pow(cX-this.posX, 2);
		let secondparam = Math.pow(cY-this.posY, 2);
		let distance = Math.sqrt(firstparam+secondparam);
		if(distance <= this.radio) {
			this.draggable = true;
		}
	}

	Chip.prototype.redmoving = function(e) {
		this.drawChips(ctx0, redchipimage);
      	if(this.draggable) {
      		movingred = true;
      		redturn = true;
        	for (let i = 0; i < chipsnumber; i++) {
          		let rect = canvas0.getBoundingClientRect();
            	ctx0.clearRect(0, 0, canvas0.width, canvas0.height);
        		this.redmousepos(e.clientX - rect.left, e.clientY - rect.top);
            	break;
        	}
        	this.drawChips(ctx0, redchipimage);
      	}
    }

	Chip.prototype.redchipdropped = function(e) {
		let boardmatrix = board1.getBoardMatrix();
		let rect = canvas1.getBoundingClientRect();
		let posY = e.clientX - rect.left;
		let rowdrop = 6;
		let coldrop = posY;
		if(posY > 0 && posY < 85) {
			coldrop = 0;
		}
		if(posY >= 85 && posY < 170) {
			coldrop = 1;
		}
		if(posY >= 170 && posY < 255) {
			coldrop = 2;
		}
		if(posY >= 255 && posY < 340) {
			coldrop = 3;
		}
		if(posY >= 340 && posY < 425) {
			coldrop = 4;
		}
		if(posY >= 425 && posY < 510) {
			coldrop = 5;
		}
		let i = 6;
		while(i > 0 && boardmatrix[i][coldrop] != null) {
			i--;
		}
		rowdrop = i;
		if(movingred && redturn) {
	        this.dropChip(ctx1, redchipimage, rowdrop, coldrop, 'red');
	      	if(this.draggable) {
	        	for (let i = 0; i < chipsnumber; i++) {
	            	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	        		this.redmousepos(e.clientX - rect.left, e.clientY - rect.top);
	            	break;
	        	}
	            board1.createBoardMatrix(6, 7, 10);
	        	this.draggable = false;
	      	}
	      	hitsound.play();
	      	$(".quantredchips").html(chipsnumber-1);
	      	redchipsputted++;
	      	redturn = false;
	      	yellowturn = true;
	    }
    }

    Chip.prototype.redup = function(e) {
      	this.draggable = false;
      	this.movingred = false;
    }

    Chip.prototype.redmousepos = function(posX, posY) {
	    this.posX = posX;
	    this.posY = posY;
    }

    Chip.prototype.redclear = function() {
      	ctx0.clearRect(0, 0, canvas0.width, canvas0.height);
      	this.drawChips(ctx0, redchipimage);
   	}

    Chip.prototype.yellowmoving = function(e) {
		this.drawChips(ctx2, yellowchipimage);
      	if(this.draggable) {
      		movingyellow = true;
        	for (let i = 0; i < chipsnumber; i++) {
          		let rect = canvas2.getBoundingClientRect();
            	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        		this.yellowmousepos(e.clientX - rect.left, e.clientY - rect.top);
            	break;
        	}
        	this.drawChips(ctx2, yellowchipimage);
      	}
    }

	Chip.prototype.yellowchipdropped = function(e) {
		let boardmatrix = board1.getBoardMatrix();
		let rect = canvas1.getBoundingClientRect();
		let posY = e.clientX - rect.left;
		let rowdrop = 6;
		let coldrop = posY;
		if(posY > 0 && posY < 85) {
			coldrop = 0;
		}
		if(posY >= 85 && posY < 170) {
			coldrop = 1;
		}
		if(posY >= 170 && posY < 255) {
			coldrop = 2;
		}
		if(posY >= 255 && posY < 340) {
			coldrop = 3;
		}
		if(posY >= 340 && posY < 425) {
			coldrop = 4;
		}
		if(posY >= 425 && posY < 510) {
			coldrop = 5;
		}
		let i = 6;
		while(i > 0 && boardmatrix[i][coldrop] != null) {
			i--;
		}
		rowdrop = i;
		if(movingyellow && yellowturn) {
	        this.dropChip(ctx1, yellowchipimage, rowdrop, coldrop, 'yellow');
	      	if(this.draggable) {
	        	for (let i = 0; i < chipsnumber; i++) {
	            	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	        		this.yellowmousepos(e.clientX - rect.left, e.clientY - rect.top);
	            	break;
	        	}
	            board1.createBoardMatrix(6, 7, 10);
	        	this.draggable = false;
	      	}
	      	hitsound.play();
	      	$(".quantyellowchips").html(chipsnumber-1);
	      	yellowchipsputted++;
	      	yellowturn = false;
	      	redturn = true;
	    }
    }

    Chip.prototype.yellowup = function(e) {
      	this.draggable = false;
      	this.movingyellow = false;
    }

    Chip.prototype.yellowmousepos = function(posX, posY) {
	      this.posX = posX;
	      this.posY = posY;
    }

    Chip.prototype.yellowclear = function() {
      	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      	this.drawChip(ctx2, yellowchipimage);
    }

	let board1 = new Board(6, 7, 10);
	let player1 = new Player();
	let player2 = new Player();

	let redchip = new Chip(canvas0.width/2, canvas0.height/2, 34.8, false, 'red');
	let yellowchip = new Chip(canvas2.width/2, canvas2.height/2, 34.8, false, 'yellow');

	redchipimage.onload = function() {
		board1.createChips();
	}


});