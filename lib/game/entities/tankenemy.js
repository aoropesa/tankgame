ig.module('game.entities.tankenemy') 
.requires('impact.entity','plugins.ai.ai') 
.defines(function(){
  EntityTankenemy = ig.Entity.extend({
    size: {x:18,y:25},
    speed:20,
    health: 200,
    offset: {x: 7, y: 4},
    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/tankenemy.png',32,32),
    init: function(x, y , settings){
      ai = new ig.ai(this),
      this.addAnim('idle',1,[17]);
      this.addAnim('up',0.1,[1,2,3,4,5,6,7,6,5,4,3,2,1]);
      this.addAnim('down',0.1,[9,10,11,12,13,14,15,14,13,12,11,10,9]);
      this.addAnim('right',0.1,[17,25,33,41,49,57,65,57,49,41,33,25,17]);
      this.addAnim('left',0.1,[18,26,34,42,50,58,66,58,50,42,34,26,18]);
      this.parent(x,y,settings);
    },
    update: function(){
        /* let the artificial intelligence engine tell us what to do */
          var action = ai.getAction(this);
        /* listen to the commands with an appropriate animation and velocity */
        switch(action){
            case ig.ai.ACTION.Rest:
            this.currentAnim = this.anims.idle;
            this.vel.x = 0;
            this.vel.y = 0;
            break;
            case ig.ai.ACTION.MoveLeft:
            this.currentAnim = this.anims.left;
            this.vel.x = -this.speed;
            this.lastpressed = 'left';
            this.addAnim( 'idle', 1, [18] );
            break;
            case ig.ai.ACTION.MoveRight :
            this.currentAnim = this.anims.right;
            this.vel.x = this.speed;
            this.lastpressed = 'right';
            this.addAnim( 'idle', 1, [17] );
            break;
            case ig.ai.ACTION.MoveUp:
            this.currentAnim = this.anims.up;
            this.vel.y = -this.speed;
            this.lastpressed = 'up';
            this.addAnim( 'idle', 1, [1] );
            break;
            case ig.ai.ACTION.MoveDown:
            this.currentAnim = this.anims.down;
            this.vel.y = this.speed;
            this.lastpressed = 'down';
            this.addAnim( 'idle', 1, [9] );
            break;
            case ig.ai.ACTION.Attack:
            this.currentAnim = this.anims.idle;
            //this.vel.x = 0;
            //this.vel.y = 0;
            ig.game.spawnEntity('EntityProjenemy',this.pos.x+8,this.pos.y+10,{direction:this.lastpressed});
            //ig.game.getEntitiesByType('EntityTankplayer')[0].receiveDamage(40,this);
            break;
            default: 
            this.currentAnim = this.anims.idle;
            this.vel.x = 0;
            this.vel.y = 0;
            break;
        }
        this.parent();
    }
  }); 
});