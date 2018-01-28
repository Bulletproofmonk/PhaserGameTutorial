var state1 = {
	
preload: function() {
	
	
	
},
	
	
	
create: function() {
	game.add.text(80,80,'Welcome to Magic Monk Space Shooter',{fill:'white'});
	game.add.text(80,160,'Press Enter to start the game',{fill:'white'});
	
	
	enterKey=game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
},	
	
	
	update: function() {
		
	if (enterKey.isDown) {
		game.state.start("state2");
	}
		
	}
	
};
