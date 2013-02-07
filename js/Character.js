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
 var Character = function(data) {
    this.load(data);   
};

Character.prototype = {
    _sprites: null,
    _Animation: new Array(),
    _image: null,
    _posX: 30,
    _posY: 0,
    _last:4,
    _speed: 3,
    _patrullaX: new Array(), 
    _patrullaY: new Array(),
    _currentPatrol:0,
    _listerner:null,
    _type:2, /* Tipo patrulla */
    _width: 0,
    _height: 0,


    load: function(data) {
    
        this._image = new Image();
        this._image.src = data.src;	
        this._speed = data.speed;
        this._width = data.width;
        this._height = data.heigth;
                
        this._sprites = new SpriteSheet({  // indicamos cada uno de los sprites
                width: this._width ,
                height: this._height,
                Nhori: 3,
                sprites: [
                    { name: 'walk_1', },
                    { name: 'stand_1',},
					{ name: 'walk_2', },
					
					{ name: 'i_walk_1'},
					{ name: 'i_stand_1'},
					{ name: 'i_walk_2'},
					
					{ name: 'd_walk_1'},
					{ name: 'd_stand_1'},
					{ name: 'd_walk_2'},
					
					{ name: 'b_walk_1'},
					{ name: 'b_stand_1'},
					{ name: 'b_walk_2'},
				]
			});
				
			
		this._Animation[0] = new Animation([ // abajo
                { sprite: 'walk_1', time: 0.2 },
                { sprite: 'stand_1', time: 0.2 },
                { sprite: 'walk_2', time: 0.2 },
                { sprite: 'stand_1', time: 0.2 },
            ], this._sprites);
            
           
		this._Animation[1] = new Animation([ //izq
                { sprite: 'i_walk_1', time: 0.2 },
                { sprite: 'i_stand_1', time: 0.2 },
                { sprite: 'i_walk_2', time: 0.2 },
                { sprite: 'i_stand_1', time: 0.2 },
            ], this._sprites);
            
		this._Animation[2] = new Animation([ // dere
                { sprite: 'd_walk_1', time: 0.2 },
                { sprite: 'd_stand_1', time: 0.2 },
                { sprite: 'd_walk_2', time: 0.2 },
                { sprite: 'd_stand_1', time: 0.2 },
            ], this._sprites);    
            
		this._Animation[3] = new Animation([ //arriba
                { sprite: 'b_walk_1', time: 0.2 },
                { sprite: 'b_stand_1', time: 0.2 },
                { sprite: 'b_walk_2', time: 0.2 },
                { sprite: 'b_stand_1', time: 0.2 } 
            ], this._sprites);  
            
		this._Animation[4] = new Animation([ // abajo
                { sprite: 'stand_1', time: 0.2 },
            ], this._sprites);
            
		this._Animation[5] = new Animation([ // izq
                { sprite: 'i_stand_1', time: 0.2 },
            ], this._sprites); 
            
		this._Animation[6] = new Animation([ // dere
                { sprite: 'd_stand_1', time: 0.2 },
            ], this._sprites); 
            
		this._Animation[7] = new Animation([ // arriba
                { sprite: 'b_stand_1', time: 0.2 },
            ], this._sprites);             
    },

    addListener: function( listener){
        this._listeners = listener;
    },
    
    getType: function(){
    
        return this._type;
    },

    fire: function(engine){

        var listeners = this._listeners;
        listeners.call(this, engine);
            
 
    },

    removeListener: function(type, listener){
        if (this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },
    
    setPose: function(x, y){
	    this._posX = x;
	    this._posY = y;
    },
    
    addPatrolPoint: function(x, y){
    
        this._patrullaX[this._patrullaX.length] = x;
        this._patrullaY[this._patrullaY.length] = y;
        
        this._posX = this._patrullaX[this._currentPatrol];
        this._posY = this._patrullaY[this._currentPatrol];
        
    },

    
    update: function(ctx, tick, tecla, poseMainCharacter, dialog){
    
    	
        var distance = Math.sqrt(( (poseMainCharacter.posX/100 - this._posX/100) * (poseMainCharacter.posX/100 - this._posX/100) ) +
		                         ( (poseMainCharacter.posY/100 - this._posY/100) * (poseMainCharacter.posY/100 - this._posY/100) ) );
		                         
        var tileX = Math.floor((this._posX ) /40);
        var tileY = Math.floor((this._posY ) /40);
               
        if(dialog || distance < 0.35){
            this._Animation[this._last].animate( tick );	
            var frame = this._Animation[this._last].getSprite(this._width, this._height);
            ctx.drawImage(this._image, frame.x, frame.y, frame.width, frame.height, this._posX, this._posY, frame.width, frame.height);
            return{ posX: this._posX, posY: this._posY, distancia: distance };
        }
        
        var ani = 2;
        
        var bool = 0;   
        
        var avance = this._speed*0.1;
        
        if(this._patrullaX.length>0){
        
		    if(this._posX - this._patrullaX[(this._currentPatrol+1)% this._patrullaX.length] == 0 &&
		       this._posY - this._patrullaY[(this._currentPatrol+1)% this._patrullaX.length] == 0){
		        this._currentPatrol++;
		        this._currentPatrol = this._currentPatrol % this._patrullaX.length;
		    }   
		    if(this._posX - this._patrullaX[(this._currentPatrol+1)% this._patrullaX.length ] > 0){ // izq
		        ani = 1;
		        this._posX -= avance;
		        bool = 1;
		    	this._last = 5; 
		    }
		    if(this._posX - this._patrullaX[(this._currentPatrol+1)% this._patrullaX.length] < 0){ // der
		        ani = 2;
		        this._posX += avance;
		        bool = 1;
		        this._last = 6;
		    }
		    if(bool==0){
		        if(this._posY - this._patrullaY[(this._currentPatrol+1)% this._patrullaX.length ] > 0){ // arriba
		            ani = 3;
		            this._posY -= avance;
		            this._last = 7;
		        }
		        if(this._posY - this._patrullaY[(this._currentPatrol+1)% this._patrullaX.length] < 0){ //abajo
		            ani = 0;
		            this._last = 4; 
		            this._posY += avance;
		        }
		    }
        }else{
			ani = -1
			this._last = 4;
		}
        
        if(ani != -1){
            this._Animation[ani].animate( tick );	
    	    var frame = this._Animation[ani].getSprite(this._width, this._height);
        }else{
            this._Animation[this._last].animate( tick );	
    	    var frame = this._Animation[this._last].getSprite(this._width, this._height);
        }
        
                  
                      
        ctx.drawImage(this._image, frame.x, frame.y, frame.width, frame.height, this._posX, this._posY, frame.width, frame.height);
        
        return { posX: this._posX, posY: this._posY, distancia: distance};
        
    }    
};
