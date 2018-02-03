var state1 = {
	
preload: function() {
	game.load.image('ship','http://examples.phaser.io/assets/games/asteroids/ship.png');
	
},
	
	
create: function() {
	
	ship = game.add.sprite(80,320,'ship');
	ship.anchor.setTo(0.5,0.5);
	
	game.add.text(80,80,'Welcome to Magic Monk Space Shooter',{fill:'white'});
	
	game.add.text(80,160,'High Score:' + highScore,{fill:'white'});
	
	game.add.text(80,240,'Instructions: Press arrow keys to move the spaceship, press space bar to fire.',{fill:'white',font:'16px Arial'});

	game.add.text(80,400,'Press Enter to start the game',{fill:'white'});

	enterKey=game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
	
	ship_anim_seg=1;
},	
	
	
	update: function() {
	
// if the animation segment is equal to 1, ship moves to the right.
	if (ship_anim_seg==1) {	
		ship.angle=0;
		ship.x+=2;	
	}
		
// if the animation segment is equal to 1 and the ship is close to the right border, change animation segment to two.
	if (ship_anim_seg==1 && ship.x>(game.world.width-ship.width)) {		
		ship_anim_seg=2;	
	}
	
// if the animation segment is equal to 2, ship moves to the left.		
	if (ship_anim_seg==2) {		
		ship.angle=180;
		ship.x-=2;	
	}

// if the animation segment is equal to 2 and the ship is close to the left border, change animation segment to 1. 
	if (ship_anim_seg==2 && ship.x<(ship.width)) {		
		ship_anim_seg=1;	
	}
		
	
		
	if (enterKey.isDown) {
		score=0;
		game.state.start("state2");
	}
		
	}
	
};
