ig.module('game.entities.tankplayer')
.requires('impact.entity')
.defines( function(){
  EntityTankplayer = ig.Entity.extend({
    size: {x:18,y:25},
    offset: {x: 7, y: 4},
    health: 200,
    animSheet: new ig.AnimationSheet('media/redtank.png', 32, 32 ),
    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      // Add the animations
      this.addAnim( 'idle', 1, [21] );
      // move your character
      ig.input.bind(ig.KEY.UP_ARROW, 'up');
      ig.input.bind(ig.KEY.DOWN_ARROW,'down');
      ig.input.bind(ig.KEY.LEFT_ARROW,'left');
      ig.input.bind(ig.KEY.RIGHT_ARROW,'right');
      this.addAnim('up',0.1,[0,1,2,3,4,5,6,5,4,3,2,1,0]);
      this.addAnim('down',0.1,[7,8,9,10,11,12,13,12,11,10,9,8,7]);
      this.addAnim('left',0.1,[14,15,16,17,18,19,20,19,18,17,16,15,14]);
      this.addAnim('right',0.1,[21,22,23,24,25,26,27,26,25,24,23,22,21]);
      
    },
    update: function(){
      this.parent();
      //player movement
      if(ig.input.pressed('attack')) {
        ig.game.spawnEntity('EntityProjectile',this.pos.x+8,this.pos.y+10,{direction:this.lastpressed});
      }
      else if(ig.input.state('up')){
        this.vel.y = -40;
        this.currentAnim = this.anims.up;
        this.lastpressed = 'up';
        this.addAnim( 'idle', 1, [0] );
      }
      else if(ig.input.state('down')) {
        this.vel.y = 40;
        this.currentAnim = this.anims.down;
        this.lastpressed = 'down';
        this.addAnim( 'idle', 1, [7] );
      }
      else if(ig.input.state('left')){
        this.vel.x = -40;
          this.currentAnim = this.anims.left;
          this.lastpressed = 'left';
          this.addAnim( 'idle', 1, [14] );
      }
      else if(ig.input.state('right')){
        this.vel.x = 40;
        this.currentAnim = this.anims.right;
        this.lastpressed = 'right';
        this.addAnim( 'idle', 1, [21] );
      }
      else{
        this.vel.y = 0;
        this.vel.x = 0;
        this.currentAnim = this.anims.idle;
      }
    },
    kill: function(){
      ig.game.gameOver();
    }
  });  
})
