$(document).ready(function() {

	let gaming = false;
	let score = 0;

	$(".game").hide();
	$(".helplist").hide();

	$(".tohelp").click(function() {
		$(".helplist").fadeIn();
	});

	$(".play").click(function() {
		$(".welcome").fadeOut();
		$(".game").fadeIn();
		gaming = true;
		play();
	});

	function play() {
		if(gaming) {
			let outerspace = $(".outerspace");

			let xwing = new Ship();
			let asteroid = new Asteroid(75, 81.3281);

			let asteroids = new Array(1);

			for(let i = 0; i < 2; i++) {
				asteroids[i] = asteroid;
			}

			$(".ast").each(function() {
				let randomtop = Math.floor(Math.random() * 450 - 350);
			    let randomleft = Math.floor(Math.random() * 450 - 150);
			    $(this).css({
			        "top": randomtop,
			        "left": randomleft
			    });
		    });
			
			drawAsteroids();
			console.log(asteroids);

			function drawAsteroids() {
				$(".ast").each(function() {
					$(".ast").html('<img src="images/asteroid.png"></img>');
				});
			}

			let isalive = xwing.isAlive();

			let highscore = 0;
			let extinguishers = 3;

			let difficulty = 1.5;
			let abletorestart = false;

			$(".score").html(score);
			$(".extinguishers").html(extinguishers);

			$(".exploded").hide();
			$(".exploded").css("animation-play-state", "paused");

			$(document).keydown(function(e) {
				keycode = e.which;
				if(isalive) {
					if(keycode == 37 || keycode == 65) {
						xwing.moveLeft();
					}
					else if(keycode == 39 || keycode == 68) {
						xwing.moveRight();
					}
				}
				else if(keycode == 32 && !isalive) {
					e.preventDefault();
					extint();
				}
			});

			$(document).keyup(function(e) {
				xwing.posorig();
			});

			function extint() {
				if(extinguishers > 0 && !isalive){
					isalive = true;
					$("#xwing").removeClass("exploded");
					$(".exploded").css("animation-play-state", "paused");
					extinguishers--;
					$(".extinguishers").html(extinguishers);
					xwing.posorig();
				}
			}

			function playagain() {
				if(extinguishers <= 0 && !isalive){
					$("#xwing").fadeIn();
					isalive = true;
					$("#xwing").removeClass("exploded");
					$(".exploded").css("animation-play-state", "paused");
					extinguishers = 3;
					$(".extinguishers").html(extinguishers);
					score = 0;
					$(".score").html(score);
					difficulty = 1.5;
				}
			}

			function updateast() {
				let randomtop = Math.floor(Math.random() * 250 - 350);
				let randomleft = Math.floor(Math.random() * 450 - 150);
				$(".ast").each(function() {
					let astrect = this.getBoundingClientRect();
					let asttop = astrect.top;
					let astbottom = astrect.bottom;
					let astright = astrect.right;
					let astleft = astrect.left;
					if(asttop < 580){
						if(asttop < 580){
							$(this).css("top", $(this).position().top + difficulty);
							if(checkCollision(asttop, astbottom, astright, astleft)) {
								$("#xwing").addClass("exploded");
								isalive = false;
								$(".exploded").show();
								$(".exploded").css("animation-play-state", "running");
								if(extinguishers == 0) {
									$("#xwing").fadeOut();
									updateHighscore();
									difficulty = 0.25;
								}
							}
						}
					}
					else if (gaming && asttop > 580) {
						if(gaming && isalive){
							score = score + 100;
							$(".score").html(score);
						}
						$(this).css({
					        "top": randomtop,
					        "left": randomleft
				    	});
					}
				});
				difficulty = difficulty + 0.0005;
			}

			function checkCollision(asttop, astbottom, astright, astleft) {
				let shiprect = document.getElementById("xwing").getBoundingClientRect();
		  		let shiptop = shiprect.top;
				let shipbottom = shiprect.bottom;
				let shipright = shiprect.right;
				let shipleft = shiprect.left;
				return (	((astleft-45 < shipleft && shipleft < astright-20) ||
							(astleft-45 < shiprect && shiprect+40 < astright)) &&
							((asttop < shiptop+12 && shiptop+12 < astbottom) ||
							(asttop < shipbottom && shipbottom < astbottom)));
			}

			function updateHighscore() {
				if(score > highscore) {
					highscore = score;
					$(".highscorenumber").html(highscore);
				}
			}

			$(".playagain").click(function() {
		  		playagain();
			});
			setInterval(updateast, 10);
		}
	}
});