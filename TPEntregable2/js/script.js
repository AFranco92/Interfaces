$(document).ready(function() {
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

	class Board {
		constructor(xmaxchips, ymaxchips, chipsize) {
			this.xmaxchips = xmaxchips;
			this.ymaxchips = ymaxchips;
			this.chipsize = chipsize;
			this.createBoardMatrix(xmaxchips, ymaxchips, chipsize);
		}
	}

	Board.prototype.createChips = function() {
		for(let i = 0; i < 21; i++) {
			redchip.drawChip(ctx0, redchipimage);
			yellowchip.drawChip(ctx2, yellowchipimage);
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

	class Player {
		constructor(chipsbundle) {
			this.chipsbundle = new Array(21);
			this.chipsbundle = chipsbundle;
		}
	}

	class Chip {
		constructor(posX, posY, radio, draggable, canvas) {
			this.posX = posX;
			this.posY = posY;
			this.radio = radio;
			this.draggable = draggable;

			canvas.addEventListener("mousedown", function (e) {
		      	this.clicked(e);
		    });
		    canvas.addEventListener("mousemove", function (e) {
		      	this.moving(e);
		    });
		    canvas.addEventListener("mouseup", function(e) {  
		      	this.up(e);
		    });
		}
	}

	Chip.prototype.drawChip = function (ctx, imagen) {
		this.radio = 34.8;
		this.posX = Math.floor(Math.random() * 150)+50;
		this.posY = Math.floor(Math.random() * 150)+50;
		ctx.beginPath();
		let image = ctx.createPattern(imagen, 'repeat');
		ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
		ctx.fillStyle = image;
		ctx.fill();
		ctx.drawImage(imagen, this.posX - this.radio, this.posY - this.radio, this.radio*2 , this.radio*2.1);
		ctx.closePath();
	}

	Chip.prototype.clicked = function(e) {
		let cX = e.layerX;
		let cY = e.layerY;
		let firstparam = Math.pow(cX-this.posX, 2);
		let secondparam = Math.pow(cY-this.posY, 2);
		let distance = Math.sqrt(firstparam+secondparam);
		console.log("cX: "+cX);
		console.log("cY: "+cY);
		console.log("posX: "+this.posX);
		console.log("posY: "+this.posY);
		console.log("Distancia: "+distance);
		if(distance < this.radio) {
			this.draggable = true;
		}
	}

	Chip.prototype.moving = function (e) {
      	if(this.draggable) {
        	let rect = canvas.getBoundingClientRect();
        	this.mousepos(e.clientX - rect.left, e.clientY - rect.top);
      	}
    }

    Chip.prototype.up = function (e) {
      	this.draggable = false;
    }

    Chip.prototype.mousepos = function(posX, posY) {
	      ctx.clearRect(0,0, canvas.width, canvas.height);
	      this.posX = posX;
	      this.posY = posY;
	      this.drawChip(ctx, imagen);
    }





	let board1 = new Board(6, 7, 10);
	let redchip = new Chip(0, 0, 34.8, false, canvas0);
	let yellowchip = new Chip(0, 0, 34.8, false, canvas2);
	let redchips = new Array(21);
	let yellowchips = new Array(21);
	let player1 = new Player(redchips);
	let player2 = new Player(yellowchips);


	redchipimage.onload = function() {
		board1.createChips();
	}


});