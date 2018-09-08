$(document).ready(function() {

	"use strict";
	
	let canvas = document.getElementById("canvas");
	let ctx = document.getElementById("canvas").getContext("2d");
	let imagen = new Image();

	crearLienzo();

	//$(".intensidad").hide();
	$(".pencilsize, .pencilcolor, .intensidad, .intensidadsat").hide();

	$(".neg").click(negativo);
	$(".bri").click(function(){$(".intensidad").show();});
	$(".intensidad").change(brillo);
	$(".bin").click(binarizacion);
	$(".sep").click(sepia);
	$(".sat").click(function(){$(".intensidadsat").show();});
	$(".intensidadsat").change(saturacion);
	$(".byn").click(blancoynegro);
	$(".lapiz").click(dibujar);
	$(".goma").click(borrar);

	function dibujar(event, color, size) {
		color = $(".pencilcolor").val();
		size = $(".pencilsize").val();
		$(".pencilcolor").show();
		$(".pencilsize").show();
		$(".pencilcolor, .pencilsize").change(function() {
			color = $(".pencilcolor").val();
			size = $(".pencilsize").val();
		})
		canvas.onmousedown = function(event) {
			canvas.onmousemove = function(event) {
				let x = event.offsetX;
				let y = event.offsetY;
				ctx.fillRect(x-5, y-5, size, size);
				ctx.fillStyle = color;
				ctx.fill();
			}
			canvas.onmouseup = function() {
				canvas.onmousemove = null;
			}
		}		
	}

	function borrar(event, color, size) {
		color = "white";
		size = 20;
		canvas.onmousedown = function(event) {
			canvas.onmousemove = function(event) {
				let x = event.offsetX;
				let y = event.offsetY;
				ctx.fillRect(x-5, y-5, size, size);
				ctx.fillStyle = color;
				ctx.fill();
			}
			canvas.onmouseup = function() {
				canvas.onmousemove = null;
			}
		}
	}

	$(".btn-reiniciar").click(function() {
		crearLienzo();
	});

	$(".btn-subir").click(function() {
		imagen.src = prompt("Elija la ruta de la imagen"); //Díalogo para cargar la imagen
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

	function negativo() {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let x, y, index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				index = (x + y * imageData.width) * 4;
				imageData.data[index+0] = 255-r;
				imageData.data[index+1] = 255-g;
				imageData.data[index+2] = 255-b;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	}

	function brillo(intensidad) {
		intensidad = $(".intensidad").val();
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let x, y, index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				index = (x + y * imageData.width) * 4;
				imageData.data[index+0] = r*intensidad;
				imageData.data[index+1] = g*intensidad;
				imageData.data[index+2] = b*intensidad;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	}

	function binarizacion() {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let x, y, index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				index = (x + y * imageData.width) * 4;
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
	}

	function sepia() {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let x, y, index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				index = (x + y * imageData.width) * 4;
				imageData.data[index+0] = 255-r;
				imageData.data[index+1] = 255-g;
				imageData.data[index+2] = 255-b;
				imageData.data[index+0] = (r*.393)+(g*.769)+(b*.189);
				imageData.data[index+1] = (r*.349)+(g*.686)+(b*.168);
				imageData.data[index+2] = (r*.272)+(g*.534)+(b*.131);
			}
		}
		ctx.putImageData(imageData, 0, 0);		
	}

	function saturacion(sat) {
		sat = $(".intensidadsat").val();
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let x, y, index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				index = (x + y * imageData.width) * 4;
				let factor = (259*(sat+255))/(255*(259-sat));
				imageData.data[index+0] = factor*(r-128)+128;
				imageData.data[index+1] = factor*(g-128)+128;
				imageData.data[index+2] = factor*(b-128)+128;
			}
		}
		ctx.putImageData(imageData, 0, 0);		
	}

	function blancoynegro() {
		let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
		let x, y, index;
		for(x = 0; x < imageData.width; x++){
			for(y = 0; y < imageData.height; y++){
				let r = getRed(imageData, x, y);
				let g = getGreen(imageData, x, y);
				let b = getBlue(imageData, x, y);
				index = (x + y * imageData.width) * 4;
				let bw = (r+g+b)/3;
				imageData.data[index+0] = bw;
				imageData.data[index+1] = bw;
				imageData.data[index+2] = bw;
			}
		}
		ctx.putImageData(imageData, 0, 0);		
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

	function cargarFoto() {
		imagen.onload = function() {
			dibujarFoto(this);
		}
	}
	function dibujarFoto(image) {
		ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
	}

	function getRed(imageData, x, y) {
		let index = (x + y * imageData.width) * 4;
		return imageData.data[index+0];
	}
	function getGreen(imageData, x, y) {
		let index = (x + y * imageData.width) * 4;
		return imageData.data[index+1];
	}
	function getBlue(imageData, x, y) {
		let index = (x + y * imageData.width) * 4;
		return imageData.data[index+2];
	}
});