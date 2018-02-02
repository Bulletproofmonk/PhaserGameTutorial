var state1 = {
	
preload: function() {
	
	
	
},
	
	
	
create: function() {
	game.add.text(80,80,'Welcome to Magic Monk Space Shooter',{fill:'white'});
	
	game.add.text(80,160,'High Score:' + highScore,{fill:'white'});
	
	game.add.text(80,240,'Instructions: Press arrow keys to move the spaceship, press space bar to fire.',{fill:'white',font:'16px Arial'});

	game.add.text(80,400,'Press Enter to start the game',{fill:'white'});

	enterKey=game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
},	
	
	
	update: function() {
		
	if (enterKey.isDown) {
		score=0;
		game.state.start("state2");
	}
		
	}
	
};
