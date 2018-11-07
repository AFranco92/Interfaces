let asteroidimage = new Image();
asteroidimage.src = './images/asteroid.png';

let astrect = document.getElementsByClassName("ast");
let posX = astrect.x;

class Asteroid {
	constructor(width, height, posX) {
		this.width = width;
		this.height = height;
		this.posX = posX;
	}
}

Asteroid.prototype.getX = function() {
	return astrect.y;
}

Asteroid.prototype.getY = function() {
	return astrect.y;
}