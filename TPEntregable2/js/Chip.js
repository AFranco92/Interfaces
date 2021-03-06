let redchipimage = new Image();
redchipimage.src = './images/redchip.png';
let yellowchipimage = new Image();
yellowchipimage.src = './images/yellowchip.png';

let hitsound = new Audio('sounds/hit.mp3');
hitsound.loop = false;

let player1 = new Player();
let player2 = new Player();

class Chip {
	constructor(posX, posY, radio, draggable, colour) {
		this.posX = posX;
		this.posY = posY;
		this.radio = radio;
		this.draggable = draggable;
		this.colour = colour;
	}
}

Chip.prototype.getColour = function() {
	return this.colour;
}

Chip.prototype.drawChip = function (ctx, imagen) {
	ctx.save();
    ctx.beginPath();
    let image = ctx.createPattern(imagen, 'repeat');
    ctx.fillStyle = image;
    ctx.fill();
    ctx.arc(this.posX, this.posY+20, this.radio+20, 0, Math.PI*2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(imagen, this.posX - this.radio, this.posY - this.radio, this.radio*2 , this.radio*2.1);
    ctx.beginPath();
   	ctx.fillStyle = image;
    ctx.fill();
    ctx.arc(this.posX, this.posY+20, this.radio+20, 0, Math.PI*2);
    ctx.clip();
    ctx.closePath();
    ctx.restore();
}

Chip.prototype.drawChips = function (ctx, imagen) {
	for(let i = 0; i < chipsnumber; i++) {
		ctx.save();
	    ctx.beginPath();
	    let image = ctx.createPattern(imagen, 'repeat');
	    ctx.fillStyle = image;
	    ctx.fill();
	    ctx.arc(this.posX, this.posY, this.radio+20, 0, Math.PI*2);
	    ctx.closePath();
	    ctx.clip();
	    ctx.drawImage(imagen, this.posX - this.radio, this.posY - this.radio, this.radio*2 , this.radio*2.1);
	    ctx.beginPath();
	   	ctx.fillStyle = image;
	    ctx.fill();
	    ctx.arc(this.posX, this.posY, this.radio+20, 0, Math.PI*2);
	    ctx.clip();
	    ctx.closePath();
	    ctx.restore();
	}
}

Chip.prototype.getPosXToDraw = function(coldrop) {
	if(coldrop == 0) {
		return (canvas1.width/6)/2;
	}
	if(coldrop == 1) {
		return (canvas1.width/6)/2+(canvas1.width/6);
	}
	if(coldrop == 2) {
		return (canvas1.width/6)/2+(canvas1.width/6)*2;
	}
	if(coldrop == 3) {
		return (canvas1.width/6)/2+(canvas1.width/6)*3;
	}
	if(coldrop == 4) {
		return (canvas1.width/6)/2+(canvas1.width/6)*4;
	}
	if(coldrop == 5) {
		return (canvas1.width/6)/2+(canvas1.width/6)*5;
	}
}

Chip.prototype.getPosYToDraw = function(rowdrop) {
	if(rowdrop == 0) {
		return (canvas1.height/7)/2;
	}
	if(rowdrop == 1) {
		return (canvas1.height/7)/2+(canvas1.height/7);
	}
	if(rowdrop == 2) {
		return (canvas1.height/7)/2+(canvas1.height/7)*2;
	}
	if(rowdrop == 3) {
		return (canvas1.height/7)/2+(canvas1.height/7)*3;
	}
	if(rowdrop == 4) {
		return (canvas1.height/7)/2+(canvas1.height/7)*4;
	}
	if(rowdrop == 5) {
		return (canvas1.height/7)/2+(canvas1.height/7)*5;
	}
	if(rowdrop == 6) {
		return (canvas1.height/7)/2+(canvas1.height/7)*6;
	}
}

Chip.prototype.dropChip = function (ctx, imagen, rowdrop, coldrop, colour) {
	this.posX = this.getPosXToDraw(coldrop);
	this.posY = this.getPosYToDraw(rowdrop);
	this.radio = 34.8;
	let boardmatrix = board1.getBoardMatrix();
	console.log(boardmatrix);
	if(boardmatrix[rowdrop][coldrop] == null) {
		boardmatrix[rowdrop][coldrop] = this.drawChip(ctx, imagen);
		boardmatrix[rowdrop][coldrop] = new Chip(this.posX, this.posY, this.radio, false, colour);
	}
	if(boardmatrix[rowdrop][coldrop] != null && redchipsputted > 3 || yellowchipsputted > 3) {
		board1.checkHorizontallyL(rowdrop, coldrop);
		board1.checkHorizontallyR(rowdrop, coldrop);
		board1.checkVerticallyD(rowdrop, coldrop);
		board1.checkDiagonallyDL(rowdrop, coldrop);
		board1.checkDiagonallyDR(rowdrop, coldrop);
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
  	if(this.draggable) {
  		movingred = true;
  		redturn = true;
    	for (let i = 0; i < chipsnumber; i++) {
      		let rect = canvas0.getBoundingClientRect();
      		let rect1 = canvas1.getBoundingClientRect();
        	ctx0.clearRect(0, 0, canvas0.width, canvas0.height);
        	this.drawChips(ctx0, redchipimage);
    		this.redmousepos(e.clientX - rect.left, e.clientY - rect.top);
    	}
    	this.drawChip(ctx0, redchipimage);
  	}
}

Chip.prototype.getColToDrop = function(posY) {
	if(posY > 0 && posY < 85) {
		return 0;
	}
	if(posY >= 85 && posY < 170) {
		return 1;
	}
	if(posY >= 170 && posY < 255) {
		return 2;
	}
	if(posY >= 255 && posY < 340) {
		return 3;
	}
	if(posY >= 340 && posY < 425) {
		return 4;
	}
	if(posY >= 425 && posY < 510) {
		return 5;
	}
}

Chip.prototype.redchipdropped = function(e) {
	if(!isthereawinner) {
		let boardmatrix = board1.getBoardMatrix();
		let rect = canvas1.getBoundingClientRect();
		let posY = e.clientX - rect.left;
		let rowdrop = 6;
		let coldrop = this.getColToDrop(posY);
		let i = 6;
		while(i > 0 && boardmatrix[i][coldrop] != null) {
			i--;
		}
		rowdrop = i;
		if(movingred && redturn && player1.turn) {
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
	      	console.log("Ficha roja colocada");
	      	$(".quantredchips").html(chipsnumber-1);
	      	redchipsputted++;
	      	player1.isNotHisTurn();
	      	redturn = false;
	      	canvas0.style.webkitAnimationPlayState = "paused";
	      	yellowturn = true;
	      	canvas2.style.webkitAnimationPlayState = "running";
	      	player2.isHisTurn();
	      	console.log("Turno de amarillas");
	    }
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

Chip.prototype.yellowmoving = function(e) {
  	if(this.draggable) {
  		movingyellow = true;
  		yellowturn = true;
    	for (let i = 0; i < chipsnumber; i++) {
      		let rect = canvas2.getBoundingClientRect();
        	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    		this.yellowmousepos(e.clientX - rect.left, e.clientY - rect.top);
    	}
    	this.drawChips(ctx2, yellowchipimage);
  	}
}

Chip.prototype.yellowchipdropped = function(e) {
	if(!isthereawinner) {
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
		if(movingyellow && yellowturn && player2.turn && yellowchipsputted < redchipsputted) {
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
	      	console.log("Ficha amarilla colocada");
	      	$(".quantyellowchips").html(chipsnumber-1);
	      	yellowchipsputted++;
	      	player2.isNotHisTurn();
	      	yellowturn = false;
	      	canvas2.style.webkitAnimationPlayState = "paused";
	      	redturn = true;
	      	canvas0.style.webkitAnimationPlayState = "running";
	      	player1.isHisTurn();
	      	console.log("Turno de rojas");
	    }
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

let board1 = new Board(6, 7, 10);
let redchip = new Chip(canvas0.width/2, canvas0.height/2, 34.8, false, 'red'); 
let yellowchip = new Chip(canvas2.width/2, canvas2.height/2, 34.8, false, 'yellow');

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
	if(redturn && movingred) {
		redchip.redchipdropped(e);
		redchip.redup(e);
	}	
	else if(yellowturn && movingyellow) {
		yellowchip.yellowchipdropped(e);
		yellowchip.yellowup(e);
	}
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
