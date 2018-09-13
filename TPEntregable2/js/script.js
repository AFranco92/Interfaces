$(document).ready(function() {
	"use strict";

$(".ganaste1, .ganaste2").hide();
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
			createBoardMatrix(xmaxchips, ymaxchips, chipsize);
		}
	}

	let createBoardMatrix = function(xmaxchips, ymaxchips, chipsize) {
		let boardmatrix = new Array(xmaxchips);
		for(let row = 0; row < xmaxchips; row++) {
			boardmatrix[row] = new Array(ymaxchips);
			for(let col = 0; col < ymaxchips+1; col++){
				boardmatrix[row][col] = createHollowChip(xmaxchips, ymaxchips, chipsize, row, col, 'black', '#CDBBBB');
			}
		}
	}

	let createHollowChip = function(xmaxchips, ymaxchips, chipsize, row, col, bordercolor, color) {
		ctx1.fillStyle = color;
		ctx1.strokeStyle = bordercolor;
		ctx1.stroke();
		ctx1.beginPath();
		ctx1.arc((canvas1.width/xmaxchips)*row+(xmaxchips*ymaxchips), 
				(canvas1.height/ymaxchips)*col+(xmaxchips*ymaxchips), 
				((canvas1.height/chipsize)*0.6), 0, Math.PI*2);
		ctx1.fill();
		ctx1.closePath();		
	}

	class Player {
		constructor() {
			let playerhasclicked = false;
		}
	}

	class Chip {
		constructor(posX, posY, radio) {
			this.posX = posX;
			this.posY = posY;
			this.radio = radio;
		}
	}

	Chip.prototype.createChips = function(ctx, color1, color2) {
		for(let i = 0; i < 21; i++) {
			this.posX = Math.floor(Math.random() * 150)+50;
			this.posY = Math.floor(Math.random() * 150)+50;
			let gradient = ctx.createLinearGradient(this.posX-this.radio, this.posY, this.posX+this.radio, this.posY);
			gradient.addColorStop(0, color1);
			gradient.addColorStop(1, color2);
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
			ctx.fill();
			ctx.closePath();
		}
	}

	let board1 = new Board(6, 7, 10);
	let player1 = new Player();
	let player2 = new Player();
	let chipprueba = new Chip(40, 40, (canvas1.height/10)*0.6);
	chipprueba.createChips(ctx0, 'red', 'black');
	chipprueba.createChips(ctx2, 'yellow', 'black');
});