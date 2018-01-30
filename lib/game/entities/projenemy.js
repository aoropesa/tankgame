ig.module('game.entities.projenemy')
.requires('impact.entity')
.defines( function(){
  EntityProjenemy = ig.Entity.extend({
    size: {x:8,y:4},
    velocity: 100,
    direction: 'right',
    vel: {x:100,y:0},
    bounciness: 1,
    collides: ig.Entity.COLLIDES.NONE,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    animSheetX: new ig.AnimationSheet('media/projectile-x.png',8,4),
    animSheetY: new ig.AnimationSheet('media/projectile-y.png',4,8),
    init: function(x, y , settings){
      this.parent(x,y,settings);
      this.anims.xaxis = new ig.Animation(this.animSheetX,1,[0]);
      this.anims.yaxis = new ig.Animation(this.animSheetY,1,[0]);
      this.currentAnim = this.anims.xaxis;
      if (this.direction == 'right'){
        this.vel.x = this.velocity;
        this.vel.y = 0;
        this.currentAnim = this.anims.xaxis;
        this.anims.xaxis.flip.x = false;
      }
      else if (this.direction == 'left'){
        this.vel.x = -this.velocity;
        this.vel.y = 0;
        this.currentAnim = this.anims.xaxis;
        this.anims.xaxis.flip.x = true;
      }
      else if (this.direction == 'up'){
        this.vel.x = 0;
        this.vel.y = -this.velocity;
        this.currentAnim = this.anims.yaxis;
        this.anims.yaxis.flip.y = false;
        }
      else if (this.direction == 'down'){
        this.vel.x = 0;
        this.vel.y = this.velocity;
        this.currentAnim = this.anims.yaxis;
        this.anims.yaxis.flip.y = true;
      }
    },
    lifetime: 0,
    update:function(){
      if (this.vel.x< 0 && this.direction == 'right'){this.anims.xaxis.flip.x = true;}
      else if (this.vel.x> 0 && this.direction == 'left'){this.anims.xaxis.flip.x = false;}
      else if (this.vel.y> 0 && this.direction == 'up'){this.anims.yaxis.flip.y = true;}
      else if (this.vel.y< 0 && this.direction == 'down'){this.anims.yaxis.flip.y = false;}
      if(this.lifetime<=100){this.lifetime +=1;}else{this.kill();}
      this.parent();
    },
    check: function(other){
      other.receiveDamage(100,this);
      this.kill();
      this.parent();
    }
  })
});