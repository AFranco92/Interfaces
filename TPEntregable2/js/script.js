$(document).ready(function() {

	$.getScript('js/classes.js');

	"use strict";

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

	let movingred, movingyellow;

	$(".quantredchips, .quantyellowchips").html(chipsnumber);

	class Board {
		constructor(xmaxchips, ymaxchips, chipsize) {
			this.xmaxchips = xmaxchips;
			this.ymaxchips = ymaxchips;
			this.chipsize = chipsize;
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
		constructor(posX, posY, radio, draggable) {
			this.posX = posX;
			this.posY = posY;
			this.radio = radio;
			this.draggable = draggable;
		}
	}

	Board.prototype.createChips = function() {
		for(let i = 0; i < chipsnumber; i++) {
			redchips.push(new Chip((200*i*2)*0.05, (200*i*2)*0.05, 34.8, false));
			yellowchips.push(new Chip((200*i*2)*0.05, (200*i*2)*0.05, 34.8, false));

			canvas0.addEventListener("mousedown", function(e) {
        		redchips[i].clicked(e);
			});
			canvas0.addEventListener("mousemove", function(e) {
	        	redchips[i].redmoving(e);
			});
			canvas0.addEventListener("mouseup", function(e) {
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

	Board.prototype.createBoardMatrix = function(xmaxchips, ymaxchips, chipsize) {
		let boardmatrix = new Array(xmaxchips);
		for(let row = 0; row < xmaxchips; row++) {
			boardmatrix[row] = new Array(ymaxchips);
			for(let col = 0; col < ymaxchips+1; col++){
				boardmatrix[row][col] = this.createHollowChip(xmaxchips, ymaxchips, chipsize, row, col, 'black', '#CDBBBB');
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

	Chip.prototype.clicked = function(e) {
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
		if(movingred) {
			this.drawChip(ctx1, redchipimage);
	      	if(this.draggable) {
	        	for (let i = 0; i < chipsnumber; i++) {
	          		let rect = canvas1.getBoundingClientRect();
	            	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	        		this.redmousepos(e.clientX - rect.left, e.clientY - rect.top);
	            	break;
	        	}
	            board1.createBoardMatrix(6, 7, 10);
	        	this.drawChip(ctx1, redchipimage);
	        	this.draggable = false;
	      	}
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
		if(movingyellow) {
			this.drawChip(ctx1, yellowchipimage);
	      	if(this.draggable) {
	        	for (let i = 0; i < chipsnumber; i++) {
	          		let rect = canvas1.getBoundingClientRect();
	            	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	        		this.yellowmousepos(e.clientX - rect.left, e.clientY - rect.top);
	            	break;
	        	}
	            board1.createBoardMatrix(6, 7, 10);
	        	this.drawChip(ctx1, yellowchipimage);
	        	this.draggable = false;
	      	}
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