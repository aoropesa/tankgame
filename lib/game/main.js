ig.module( 'game.main' )
.requires(
	'impact.game',
	'impact.font',
	'game.levels.level1',
	'game.levels.level2',
	'game.entities.tankplayer',
	'game.entities.tankenemy', 
	'game.entities.projectile',
	'game.entities.projenemy',
	'game.entities.levelchange',
	'game.entities.trigger',
	'plugins.box2d.game',
	'plugins.ai.ai',
	'plugins.hud.hud',
	'impact.debug.debug'
)
.defines(function(){
	GameInfo = new function(){
		this.lives=3;
		this.level=	LevelLevel1;
		this.currentLevel = LevelLevel1;
		this.coin = 0;
		this.projectiles = 0;
	}
	OpenScreen = ig.Game.extend({
		StartImage : new ig.Image('media/StartScreen.png'),
		init:function(){
		if(ig.ua.mobile){
			ig.system.setGame(game4);
		}
			ig.input.bind(ig.KEY.SPACE,'LoadGame');
		},
		init:function(){
			if(ig.ua.mobile){ig.input.bindTouch( '#canvas','LoadGame' );}
			else {ig.input.bind(ig.KEY.SPACE,'LoadGame');}
		},
		update:function(){
			if(ig.input.pressed('LoadGame')){
				ig.system.setGame(game4);
			}
		},
		draw: function(){
			this.parent();
			this.StartImage.draw(0,0);
			/* var canvas = document.getElementById('canvas');
			if(canvas.getContext){
				var context = canvas.getContext('2d');
				context.fillStyle = "rgb(150,29,28)";
				context.fillRect (10,10,100,30);
			}
			var font = new ig.Font('media/font.png');
			//font.draw('player:' + GameInfo.name,10,10); */
		}
	}), 

	game4 = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	hud: new ig.hud(),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelLevel1);
		var player = ig.game.getEntitiesByType('EntityTankplayer')[0];
    this.hud.setMaxHealth(player.health);
		ig.input.bind(ig.KEY.MOUSE1,'attack');
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},

	gameOver: function(){
		ig.system.setGame(gameOver);
	},
	
	//respawn function for the player
	respawn: function(){
		GameInfo.lives = GameInfo.lives -1;
		if (GameInfo.lives <= 0){ 
			ig.system.setGame(gameOver);}
		else{
			this.loadLevelDeferred(GameInfo.level);
		}
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		var player = this.getEntitiesByType( EntityTankplayer )[0];
		//this.myNoteManager.draw();
		
		//this.font.draw('health:' + player.health,10,10); //the user health
		
		// Add your own drawing code here
		var gameviewport= ig.game.screen;
		if(ig.input.state('camera_right')) {gameviewport.x = gameviewport.x + 2;}
		else if(ig.input.state('camera_left')) {gameviewport.x = gameviewport.x - 2;}
		else if(ig.input.state('camera_up'))	{gameviewport.y = gameviewport.y - 2;}
		else if(ig.input.state('camera_down')) {gameviewport.y = gameviewport.y + 2;} 
	},

	/* loadMyLevel: function(stage){
		GameInfo.level = stage;
		GameInfo.currentLevel = stage;
		this.loadLevelDeferred(stage);    
	}, */
},
	gameOver = ig.Game.extend({
		gameOverImage : new ig.Image('media/GameOver.png'),
		init: function(){
			ig.input.bind(ig.KEY.SPACE,'LoadGame');
		},
		update:function(){
			if(ig.input.pressed('LoadGame')){
				ig.system.setGame(game4);
			}
		},
		draw: function(){
			this.parent();
		//	var font = new ig.Font('media/font.png');
			this.gameOverImage.draw(0,0);
		//	font.draw('HIT SPACE TO TRY AGAIN',150,50);
		}
	}),
);


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', OpenScreen, 60, 480, 335, 1.75 );

});
