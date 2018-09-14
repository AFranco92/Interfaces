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
				34.8, 0, Math.PI*2);
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

	Chip.prototype.generateChip = function(ctx, imagen) {
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

	Chip.prototype.isClicked = function(e) {
		let cX = e.layerX;
		let cY = e.layerY;
		let firstparam = Math.pow((cX-this.posX), 2);
		let secondparam = Math.pow((cY-this.posY), 2);
		let distance = Math.sqrt(firstparam+secondparam);
		console.log("cX: "+cX);
		console.log("cY: "+cY);
		console.log("posX: "+this.posX);
		console.log("posY: "+this.posY);
		console.log("Distancia: "+distance);
		if(distance <= this.radio) {
			alert("Dentro");
		}
		else {
			alert("Fuera");
		}
	}

	let createChips = function(size) {
		let redchip, yellowchip;
		let redchips = new Array(21);
		let yellowchips = new Array(21);
		for(let i = 0; i < 21; i++) {
			redchip = new Chip(0, 0, size);
			yellowchip = new Chip(0, 0, size);
			redchips[i] = redchip.generateChip(ctx0, redchipimage);
			yellowchips[i] = yellowchip.generateChip(ctx2, yellowchipimage);
		}
		canvas0.addEventListener("mousedown", function(e) {
        	redchip.isClicked(e);
		})
		canvas2.addEventListener("mousedown", function (e) {
        	yellowchip.isClicked(e);
    	});
	}

	let board1 = new Board(6, 7, 10);
	let player1 = new Player();
	let player2 = new Player();

	let redchipimage = new Image();
	redchipimage.src = './images/redchip.png';
	let yellowchipimage = new Image();
	yellowchipimage.src = './images/yellowchip.png';

	redchipimage.onload = function() {
		createChips(34.8);
	}















});