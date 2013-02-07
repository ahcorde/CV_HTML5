/*
 *
 *  Copyright (C) 1997-2009 JDERobot Developers Team
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see http://www.gnu.org/licenses/. 
 *
 *  Authors : Alejandro Hernández Cordero <ahcorde@gmail.com>
 *
 */
 var MainCharacter = function(data) {
    this.load(data);
};

MainCharacter.prototype = {
    _sprites: [],
    _animation: [],
    _image: null,
    _posX: 200,
    _posY:0,
    last:4,
    speed: 1,
    _type:0,
    _frame: null,
    _width: 31.5,
    _height: 47.5,

    load: function(data) {
        this._sprites = new SpriteSheet({  // indicamos cada uno de los sprites
                width: 31.5,
                height: 47.5,
                Nhori: 4,
                sprites: [
                    { name: 'stand_1',  },
                    { name: 'walk_1', },
                    { name: 'stand_2', },
					{ name: 'walk_2', },
					{ name: 'i_stand_1'},
					{ name: 'i_walk_1'},
					{ name: 'i_stand_2'},
					{ name: 'i_walk_2'},
					{ name: 'd_stand_1'},
					{ name: 'd_walk_1'},
					{ name: 'd_stand_2'},
					{ name: 'd_walk_2'},
					{ name: 'b_stand_1'},
					{ name: 'b_walk_1'},
					{ name: 'b_stand_2'},
					{ name: 'b_walk_2'},
				]
			});
				
			
		this._animation[0] = new Animation([ // abajo
                { sprite: 'walk_1', time: 0.2 },
                { sprite: 'stand_1', time: 0.2 },
                { sprite: 'walk_2', time: 0.2 },
                { sprite: 'stand_2', time: 0.2 },
            ], this._sprites);
            
		this._animation[1] = new Animation([ //izq
                { sprite: 'i_walk_1', time: 0.2 },
                { sprite: 'i_stand_1', time: 0.2 },
                { sprite: 'i_walk_2', time: 0.2 },
                { sprite: 'i_stand_2', time: 0.2 },
            ], this._sprites);
            
		this._animation[2] = new Animation([ // dere
                { sprite: 'd_walk_1', time: 0.2 },
                { sprite: 'd_stand_1', time: 0.2 },
                { sprite: 'd_walk_2', time: 0.2 },
                { sprite: 'd_stand_2', time: 0.2 },
            ], this._sprites);    
            
		this._animation[3] = new Animation([ //arriba
                { sprite: 'b_walk_1', time: 0.2 },
                { sprite: 'b_stand_1', time: 0.2 },
                { sprite: 'b_walk_2', time: 0.2 },
                { sprite: 'b_stand_2', time: 0.2 } 
            ], this._sprites);  
            
		this._animation[4] = new Animation([ // abajo
                { sprite: 'stand_1', time: 0.2 },
            ], this._sprites);
            
		this._animation[5] = new Animation([ // izq
                { sprite: 'i_stand_1', time: 0.2 },
            ], this._sprites); 
            
		this._animation[6] = new Animation([ // dere
                { sprite: 'd_stand_1', time: 0.2 },
            ], this._sprites); 
            
		this._animation[7] = new Animation([ // arriba
                { sprite: 'b_stand_1', time: 0.2 },
            ], this._sprites);             

        
        this._image = new Image();
        this._image.src = data.src;	
        this.speed = data.speed;
		this._posX = data.posX;
		this._posY = data.posY;
    },
    
    getType: function(){
    
        return this._type;
    },
    
    getPos: function(){    
        return { posX: this._posX, posY: this._posY};
    },
    
    update: function(ctx, tick, tecla, Posplayer, tileWalk, walk, cambioMapa){       
        
        var i = 0.1* this.speed;
        
        var indiceCambioMapa = -1;
        var ani = -1;
        var tileX = Math.floor((this._posX + 31.5/2 ) /40);
        var tileY = Math.floor((this._posY + 47.5)  /40);
        
        if(cambioMapa[tileX + tileY*16]>0)
       		indiceCambioMapa = cambioMapa[tileX + 16*tileY];
       		

       		
		var walkable = false;
		var cerca = 0;
    	for(var p in Posplayer){
    		pose  = Posplayer[p];
        	var distance = Math.sqrt(( (pose.posX/100 - this._posX/100) * (pose.posX/100 - this._posX/100) ) +
                         		 	( (pose.posY/100 - this._posY/100) * (pose.posY/100 - this._posY/100) ) );
 		 	if(distance < 0.3) cerca = 1;
        }
        

	    for(var j = 0; j < walk.length ;j++){
	        if(    tileWalk[tileX + tileY*16][0] == walk[j][0] 
	            && tileWalk[tileX + tileY*16][1] == walk[j][1])
	                walkable = true;
	    }
	    

			if(walkable && cerca==0){
				if(this._posX < 0){
					this._posX += i;
				}else if(this._posX > 640){
						this._posX -= i;
				}else if(this._posY > 640){
							this._posY -= i;
				}else if(this._posY < 0){
								this._posY += i;
				}else 
					 //colision
					if(tecla == 38){ //arriba
						ani = 3;
						this._posY -= i; 
						this.last = 7;
					}
					if(tecla == 40 ){ //abajo
						ani = 0;
						this._posY += i;
						this.last = 4; 
					}
					if(tecla == 37){ //izq
						ani = 1;
						this._posX -= i;
						this.last = 5; 
					}
					if(tecla == 39){ //dere
						ani = 2;
						this._posX += i; 
						this.last = 6;
					}
				
			}else{
				//console.log("Quitate")
				if(this.last == 6 ){
				ani = 2;
				this._posX -= i; 
				}
				if(this.last == 5 ){
				ani = 1;
				this._posX += i; 
				}
				if(this.last == 4 ){
				ani = 0
				this._posY -= i; 
				}
				if(this.last == 7 ){
				ani = 3;
				this._posY += i; 
				}
			}
		
        
      
        if(ani != -1){
            this._animation[ani].animate( tick );	
    	    this._frame = this._animation[ani].getSprite(this._width, this._height);
        }else{
            this._animation[this.last].animate( tick );	
    	    this._frame = this._animation[this.last].getSprite(this._width, this._height);
        }
    
		ctx.drawImage(this._image, this._frame.x,  this._frame.y,  this._frame.width,  this._frame.height, this._posX, this._posY, this._frame.width, this._frame.height);
		                         	
		return {posX: this._posX, posY: this._posY, indiceCambioMapa: indiceCambioMapa };
    },
  
    draw: function(ctx){ 
    		ctx.drawImage(this._image, this._frame.x,  this._frame.y,  this._frame.width,  this._frame.height, this._posX, this._posY, this._frame.width, this._frame.height);
    }
    
};
