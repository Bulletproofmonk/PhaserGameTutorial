
// time in ms between each bullet fired
var fireRate = 100;
	
// time in ms since start of game when the next bullet is allowed to be fired	
var nextFireTime = 0;
	
// time in ms between each alien created
var alienRate = 3000;
	
// time in ms since start of game when the next alien will be created
var nextAlienTime = 0;	

var state2 = {
	
preload: function() {
	game.load.image('background', 'http://examples.phaser.io/assets/skies/deep-space.jpg');
	game.load.image('ship','http://examples.phaser.io/assets/games/asteroids/ship.png');
	game.load.spritesheet('enemy','http://examples.phaser.io/assets/games/invaders/invader32x32x4.png',32,32);
	game.load.image('bulletSprite','http://examples.phaser.io/assets/sprites/purple_ball.png');
	//loads assets into your game	
	
},
	
	
	
create: function() {
		
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.tileSprite(0,0,game.width,game.height,'background');
	
	// adding the player object
	player = game.add.sprite(400,300,'ship');
	player.scale.setTo(1.5,1.5);
	player.anchor.setTo(0.5,0.5);
	
	game.physics.arcade.enable(player);
	
	// adding the enemy group
	aliens = game.add.group();
	aliens.enableBody=true;
	aliens.physicsBodyType=Phaser.Physics.ARCADE;	
	aliens.setAll('checkWorldBounds',true);
	aliens.setAll('outOfBoundsKill',true);
	generateEnemy();
	
	
	// set up bullets
	bullets = game.add.group();
	bullets.enableBody=true;
	bullets.physicsBodyType=Phaser.Physics.ARCADE;
	bullets.createMultiple(50,'bulletSprite');
	bullets.setAll('checkWorldBounds',true);
	bullets.setAll('outOfBoundsKill',true);
	
	
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	
	// create objects for your game, set up your game
	
	
	
	
},	
	
	
update: function() {
	// check if player and aliens collide
	
	game.physics.arcade.overlap(player,aliens,die);
	
	game.physics.arcade.overlap(bullets,aliens,bulletAlienCollision);
	
	// controls for player
	if (upKey.isDown) {
		player.y=player.y-2;
		player.angle=270;
			if (leftKey.isDown) {
				player.x=player.x-2;	
				player.angle=225;
			}
			
			if (rightKey.isDown) {
				player.x=player.x+2;
				player.angle=315;
			}
		
	} else if (downKey.isDown) {
		player.y=player.y+2;	
		player.angle=90;
			if (leftKey.isDown) {
				player.x=player.x-2;	
				player.angle=135;
			}
			
			if (rightKey.isDown) {
				player.x=player.x+2;
				player.angle=45;
			}		
		
	} else if (leftKey.isDown) {
				player.x=player.x-2;	
				player.angle=180;
			} else if (rightKey.isDown) {
				player.x=player.x+2;
				player.angle=0;
			}		 
	
// fire the bullet with space bar
	
	if (fireKey.isDown) {
		fire();
	}
		
	
	if (game.time.now>nextAlienTime) {
		nextAlienTime = game.time.now + alienRate;
		generateEnemy();
	}
	
	//check for object collision, input from user etc.	



},
	
	
render: function() { 
// 	game.debug.text('alienX '+alienX,50,50);
// 	game.debug.text('player.x: '+player.x,50,100);
//  game.debug.spriteInfo(player,50,100);
//	game.debug.text('Active bullets: '+bullets.countLiving(),50,100)

game.debug.text('Score: '+score,50,50);
game.debug.text('High Score: '+highScore,50,100);

	
	
}
		
};


function fire() {
	if (game.time.now>nextFireTime) {
		
		// increase nextFireTime variable to when another bullet is allowed to be fired.
		nextFireTime = game.time.now + fireRate;
	
	var bullet=bullets.getFirstDead();
	bullet.reset(player.x,player.y);
	game.physics.arcade.velocityFromAngle(player.angle,300,bullet.body.velocity);
	}
		
}
	
// code for killing player
function die () {
	game.state.start("state1");
	
}
	
// code for generating the Enemy
function generateEnemy() {
	alienX = game.rnd.integerInRange(0,800);
	alienY = game.rnd.integerInRange(0,600);
	
	while (game.math.difference(alienX,player.x)<=50) {
			alienX = game.rnd.integerInRange(0,800);			
		}
	
	while (game.math.difference(alienY,player.y)<=50) {
			alienY = game.rnd.integerInRange(0,800);			
		}
	
	alien = game.add.sprite(alienX,alienY,'enemy');
	alien.anchor.setTo(0.5,0.5);
	alien.scale.setTo(2,2);
	alien.animations.add('move',[0,1,2,3],20,true);
	alien.animations.play('move');
	aliens.add(alien);
	
}
	
// code for bullet destroying enemy	
function bulletAlienCollision(a,b) {
	a.kill();
	b.kill();
	score+=10;
	if (highScore<score) {
		highScore=score;
	}
	
	
}

