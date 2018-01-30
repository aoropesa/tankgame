
ig.module('plugins.hud.hud')
.defines(function(){
  ig.hud = ig.Class.extend({ 
    canvas  : document.getElementById('canvas'), //get the canvas
    context : canvas.getContext('2d'),
    maxHealth  : null,
    init: function(){
      ig.Game.inject({
        draw: function(){
          this.parent();
          // draw hud if there is a player
          if(ig.game.getEntitiesByType('EntityTankplayer').length  !=0){
            if (this.hud){
            this.hud.number();
            this.hud.bar();
            } 
          }
        }
      })
    }, 
    number: function(){ 
      if(!this.context) return null;
      var player =ig.game.getEntitiesByType('EntityTankplayer')[0];
      // draw a transparant black rectangle 
      var context = this.canvas.getContext('2d');
      context.fillStyle = "rgb(0,0,0)";
      //context.setAlpha(0.7); //set transparency 
      context.fillRect(10,10,100,30);
      //draw text on top of the rectangle 
      context.fillStyle = "rgb(255,255,255)";
      context.font = "15px Arial";
      context.fillText('health: ' + player.health,20,30);
      //font used is the default canvas font
      //context.setAlpha(1);
      return null;
    },
    bar: function(){
      if(!this.context) return null;
      var player = ig.game.getEntitiesByType('EntityTankplayer')[0];
      // draw a transparant black rectangle 
      var h = 100*Math.min(player.health / this.maxHealth,100);
      var color = h < 30 ? "rgb(150,0,0)" :"rgb(0,0,150)";
      var context = this.canvas.getContext('2d');
      context.fillStyle = "rgb(0,0,0)";
      //context.setAlpha(0.7);
      context.fillRect(10,50,100,10);
      //either draw a blue or red rectangle on top of theblack one var color = h < 30 ? "rgb(150,0,0)" :"rgb(0,0,150)";
      context.fillStyle = color;
     // context.setAlpha(0.9);
      context.fillRect(10,50,h,10);
      //context.setAlpha(1);
      return null;
    },
    setMaxHealth: function(health){
      this.maxHealth = health;
    }
  })
})


