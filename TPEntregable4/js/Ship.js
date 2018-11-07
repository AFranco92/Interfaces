class Ship {
	constructor(width, height, posX, posY, alive) {
		this.width = width;
		this.height = height;
		this.posX = $("#xwing").position().left;
		this.posY = $("#xwing").position().top;
		this.alive = true;
	}
}

let maxRight = $(".outerspace").width()-297;
let minLeft = -maxRight;
let left = 40;

Ship.prototype.posorig = function() {
	$("#xwing").css({'transform' : 'rotate('+ 0 +'deg)'})
}

Ship.prototype.alive = function(boolean) {
	this.alive = boolean;
}

Ship.prototype.isAlive = function() {
	return this.alive;
}

Ship.prototype.moveLeft = function() {
	if(this.alive){
		let	leftpos = $("#xwing").position().left;
		if(leftpos > -220) {
			$("#xwing").css("left", $("#xwing").position().left - 30);
			$("#xwing").css({'transform' : 'rotate('+ 340 +'deg)'});
		}
	}
}

Ship.prototype.moveRight = function() {
	if(this.alive) {
		let	leftpos = $("#xwing").position().left;
		if(leftpos < maxRight) {
			$("#xwing").css("left", $("#xwing").position().left + 30);
			$("#xwing").css({'transform' : 'rotate('+ 20 +'deg)'});
		}
	}	
}