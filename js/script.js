$(document).ready(function() {
	
	let canvas = document.getElementById("canvas");
	let ctx = document.getElementById("canvas").getContext("2d");
	let imagen = new Image();

	crearLienzo();

	function getRed(imageData, x, y) {
		index = (x + y * imageData.width) * 4;
		return imageData.data[index+0];
	}
	function getGreen(imageData, x, y) {
		index = (x + y * imageData.width) * 4;
		return imageData.data[index+1];
	}
	function getBlue(imageData, x, y) {
		index = (x + y * imageData.width) * 4;
		return imageData.data[index+2];
	}

	function setPixel(imageData, x, y, r, g, b, a) {
		let index = (x + y * imageData.width) * 4;
		imageData.data[index+0] = r;
		imageData.data[index+1] = g;
		imageData.data[index+2] = b;
		imageData.data[index+3] = a;
	}

	function crearLienzo() {
		function paintRect(r, g, b, a) {
			let x, y;
			let imageData = ctx.createImageData(430, 440);
			for(x = 0; x < imageData.width; x++) {
				for(y = 0; y < imageData.height; y++) {
					setPixel(imageData, x, y, r, g, b, a);
				}
			}
			ctx.putImageData(imageData, 0, 0);
		}
		paintRect(255, 255, 255, 255);
	}

	let md = false;

	function down() {
		md = true;
	}
	function toggleDraw() {
		md = false;
	}
	function getMousePos(canvas, evt) {
		let rect = canvas.getBoundingClientRect();
		return {
			x:evt.clientX - rect.left,
			y:evt.clientY - rect.top
		}
	}

	function cargarFoto() {
		imagen.onload = function() {
			dibujarFoto(this);
		}
	}
	function dibujarFoto(image) {
		ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
	}

	$(".neg").click(function(x, y) {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y, index);
				let g = getGreen(imageData, x, y, index);
				let b = getBlue(imageData, x, y, index);
				imageData.data[index+0] = 255-r;
				imageData.data[index+1] = 255-g;
				imageData.data[index+2] = 255-b;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	});

	$(".intensidad").hide();
	$(".bri").click(function(x, y) {
		$(".intensidad").show();
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				$(".intensidad").click(function() {
					let intensidad = $('.intensidad').val();
					imageData.data[index+0] = r+intensidad;
					imageData.data[index+1] = g+intensidad;
					imageData.data[index+2] = b+intensidad;
				});
			}
		}
		ctx.putImageData(imageData, 0, 0);
	});

	$(".bin").click(function(x, y) {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				let bw = (r+g+b)/3;
				if (bw > 120) {
		            imageData.data[index+0] = 255;
	    	        imageData.data[index+1] = 255;
	        	    imageData.data[index+2] = 255;
				}
				else {
	            	imageData.data[index+0] = 0;
	            	imageData.data[index+1] = 0;
		            imageData.data[index+2] = 0;
				}
			}
		}
		ctx.putImageData(imageData, 0, 0);
	});

	$(".sep").click(function(x, y) {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				imageData.data[index+0] = 255-r;
				imageData.data[index+1] = 255-g;
				imageData.data[index+2] = 255-b;
				imageData.data[index+0] = (r*.393)+(g*.769)+(b*.189);
				imageData.data[index+1] = (r*.349)+(g*.686)+(b*.168);
				imageData.data[index+2] = (r*.272)+(g*.534)+(b*.131);
			}
		}
		ctx.putImageData(imageData, 0, 0);
	});

	$(".sat").click(function(x, y) {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				let sat = 100;
				let factor = (259*(sat+255))/(255*(259-sat));
				imageData.data[index+0] = factor*(r-128)+128;
				imageData.data[index+1] = factor*(g-128)+128;
				imageData.data[index+2] = factor*(b-128)+128;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	});

	$(".det").click(function(x, y) {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				if((r+g+b) - (r+g+b)) {
					
				}
			}
		}
		ctx.putImageData(imageData, 0, 0);		
	});

	$(".byn").click(function(x, y) {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				let bw = (r+g+b)/3;
				imageData.data[index+0] = bw;
				imageData.data[index+1] = bw;
				imageData.data[index+2] = bw;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	});

	$(".blu").click(function() {
		function blur(imagen, ctx, passes) {
		  	let i, x, y;
		  	passes = passes || 4;
		  	ctx.globalAlpha = 0.01;
		  	// Loop for each blur pass.
		  	for (i = 1; i <= passes; i++) {
		    	for (y = -1; y < 2; y++) {
		      		for (x = -1; x < 2; x++) {
		          		ctx.drawImage(imagen, x, y);
		      		}
		    	}
		  	}
		  ctx.globalAlpha = 1.0;
		}
		blur(imagen, ctx);
	});

	$(".pencilsize, .pencilcolor").hide();
	$(".lapiz").click(function(event) {
		event.preventDefault();
		let eraser;
		eraser = false;
		$(".pencilsize, .pencilcolor").show();
		let size = $(".pencilsize").val();
		let color = $(".pencilcolor").val();
		canvas.addEventListener("mousedown", down);
		canvas.addEventListener("mouseup", toggleDraw);
		canvas.addEventListener("mousemove", function(evt) {
			let mousepos = getMousePos(canvas, evt);
			let posx = mousepos.x;
			let posy = mousepos.y;
			draw(canvas, posx, posy, color);
		});
		function draw(canvas, posx, posy, color) {
			if(md && eraser == false) {
				canvas.style.cursor = "pointer";
				ctx.fillRect(posx, posy, size, size);
				ctx.fillStyle = color;
			}
		}
		$(".goma").click(function(event) {
			event.preventDefault();
			eraser = true;
			canvas.addEventListener("mousedown", down);
			canvas.addEventListener("mouseup", toggleDraw);
			canvas.addEventListener("mousemove", function(evt) {
				let mousepos = getMousePos(canvas, evt);
				let posx = mousepos.x;
				let posy = mousepos.y;
				erase(canvas, posx, posy, "white");
			});
			function erase(canvas, posx, posy, color) {
				if(md && eraser) {
					canvas.style.cursor = "pointer";
					ctx.fillRect(posx, posy, 10, 10);
					ctx.fillStyle = color;
				}
			}
		});
	});

	$(".btn-reiniciar").click(function() {
		crearLienzo();
	});

	$(".btn-subir").click(function() {
		imagen.src = prompt("Elija la ruta de la imagen");
		cargarFoto();
	});

	$(".btn-descargar").click(function(event) {
		event.preventDefault();
	    let btn = window.document.createElement('a'),
	    url = canvas.toDataURL('images/png'),
	    filename = 'image.png';	 
	    btn.setAttribute('href', url);
	    btn.setAttribute('download', filename);
	    btn.style.visibility = 'hidden';
	    window.document.body.appendChild(btn);
	    btn.click();
	    window.document.body.removeChild(btn);
	});
});