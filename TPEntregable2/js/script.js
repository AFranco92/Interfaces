$(document).ready(function() {

	//$.getScript('js/classes.js');

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

	let chipsnumber = 1;

	let isthereawinner = false;

	let movingred, movingyellow;

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

	Board.prototype.createChips = function() {
		for(let i = 0; i < chipsnumber; i++) {
			redchips.push(new Chip((200*i*2)*0.05, (200*i*2)*0.05, 34.8, false, 'red'));
			yellowchips.push(new Chip((200*i*2)*0.05, (200*i*2)*0.05, 34.8, false, 'yellow'));

			canvas0.addEventListener("mousedown", function(e) {
        		redchips[i].clicked(e);
			});
			canvas0.addEventListener("mousemove", function(e) {
	        	redchips[i].redmoving(e);
			});
			canvas0.addEventListener("mouseup", function(e) {
	        	redchips[i].redup(e);
			});

			canvas0.addEventListener("mouseout", function(e) {
	        	redchips[i].redup(e);
			});

			canvas1.addEventListener("mouseup", function(e) {
				redchips[i].redchipdropped(e);
				yellowchips[i].yellowchipdropped(e);
			});

			canvas2.addEventListener("mousedown", function(e) {
        		yellowchips[i].clicked(e);
			});
			canvas2.addEventListener("mousemove", function(e) {
	        	yellowchips[i].yellowmoving(e);
			});
			canvas2.addEventListener("mouseup", function(e) {
	        	yellowchips[i].yellowup(e);
			});
		}
		for(let i = 0; i < chipsnumber; i++) {
			redchips[i].drawChip(ctx0, redchipimage);
			yellowchips[i].drawChip(ctx2, yellowchipimage);
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

	Board.prototype.checkHorizontallyR = function(rowdrop, coldrop) {
		if(!isthereawinner) {
			let counter = 1;
			while(coldrop < this.ymaxchips) {
				while(	this.boardmatrix[rowdrop][coldrop+1] != null && 
						this.boardmatrix[rowdrop][coldrop] == this.boardmatrix[rowdrop][coldrop+1]) {
					counter++;
					if(counter == 4) {
						alert("¡Ganador!");
						isthereawinner = true;
					}
				}
				coldrop++;
			}
			if(counter < 4) {
				this.checkHorizontallyL(rowdrop, coldrop);
			}
		}
	}

	Board.prototype.checkHorizontallyL = function(rowdrop, coldrop) {
		let counter = 1;
		while(!isthereawinner && coldrop >= 0) {
			while(	this.boardmatrix[rowdrop][coldrop-1] != null && 
					this.boardmatrix[rowdrop][coldrop] == this.boardmatrix[rowdrop][coldrop-1]) {
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
			ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
			ctx.fillStyle = image;
			ctx.fill();
			ctx.closePath();
			ctx.drawImage(imagen, this.posX - this.radio, this.posY - this.radio, this.radio*2 , this.radio*2.1);
		}
	}

	Chip.prototype.dropChip = function (ctx, imagen, rowdrop, coldrop, colour) {
		let posY = coldrop;
		let posX = rowdrop;
		this.radio = 34.8;
		ctx.beginPath();
		let image = ctx.createPattern(imagen, 'repeat');
		ctx.arc(posX, posY, this.radio, 0, Math.PI*2);
		ctx.fillStyle = image;
		ctx.fill();
		ctx.closePath();
		$(".quant"+colour+"chips").html(chipsnumber-1);
		let boardmatrix = board1.getBoardMatrix();
		console.log(rowdrop, coldrop);
		console.log(boardmatrix);
		if(boardmatrix[rowdrop][coldrop] == null) {
			ctx.drawImage(imagen, posX - this.radio, posY - this.radio, this.radio*2 , this.radio*2.1);
			boardmatrix[rowdrop][coldrop] = new Chip(posX, posY, false, 0, 1, colour);
			//board1.checkHorizontallyR(rowdrop, coldrop);
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
		if(movingred) {
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
	    }
    }

    Chip.prototype.redup = function(e) {
      	this.draggable = false;
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
	    let rect = canvas1.getBoundingClientRect();
		if(yellowturn && movingyellow) {
	        this.dropChip(ctx1, yellowchipimage, e.clientX - rect.left, e.clientY - rect.top, 'yellow');
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
	    }
    }

    Chip.prototype.yellowup = function(e) {
      	this.draggable = false;
    }

    Chip.prototype.yellowmousepos = function(posX, posY) {
	      this.yellowclear();
	      this.posX = posX;
	      this.posY = posY;
	      this.drawChip(ctx2, yellowchipimage);
    }

    Chip.prototype.yellowclear = function() {
      	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      	this.drawChip(ctx2, yellowchipimage);
    }

	let board1 = new Board(6, 7, 10);
	let player1 = new Player();
	let player2 = new Player();


	redchipimage.onload = function() {
		board1.createChips();
	}


});