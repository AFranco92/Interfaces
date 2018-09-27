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
	let ctx01 = canvas1.getContext('2d');
	let ctx1 = canvas1.getContext('2d');
	let ctx2 = canvas2.getContext('2d');

	canvas2.style.webkitAnimationPlayState = "paused";

	let redchips = [];
	let yellowchips = [];

	let chipsnumber = 4;

	let isthereawinner = false;

	let movingred, movingyellow;

	let redchipsputted = 1; 
	let yellowchipsputted = 1;

	let redturn = true;
	let yellowturn = false;

    let intromusic = document.getElementById("intromusic");
    intromusic.volume = 0.02;

    $(".restart").click(function() {
    	window.location.reload();
    });

	$(".container").hide();
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

	player1.isHisTurn();

	redchipimage.onload = function() {
		for(let i = 0; i < chipsnumber; i++) {
			redchips.push(new Chip(canvas0.width/2, canvas0.height/2, 34.8, false, 'red'));
			yellowchips.push(new Chip(canvas2.width/2, canvas2.height/2, 34.8, false, 'yellow'));
			redchips[i] = redchip.drawChip(ctx0, redchipimage);
			yellowchips[i] = yellowchip.drawChip(ctx2, yellowchipimage);
		}
	}
});