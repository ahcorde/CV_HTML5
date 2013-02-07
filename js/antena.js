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
 var Antena = function(data) {
    this.load(data);
};

Antena.prototype = {
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
        
        this._width= data.width;
        this._height= data.height;
        
        console.log(this._width + " " + this._height);
    
        this._sprites = new SpriteSheet({  // indicamos cada uno de los sprites
                width: this._width,
                height: this._height,
                Nhori: 4,
                sprites: [
                    { name: 'pose_1',  },
                    { name: 'pose_2', },
                    { name: 'pose_3', },
					{ name: 'pose_4', },
					{ name: 'pose_5'},
					{ name: 'pose_6'},
					{ name: 'pose_7'},
					{ name: 'pose_8'},
					{ name: 'pose_9'},
					{ name: 'pose_10'},
					{ name: 'pose_11'},
					{ name: 'pose_12'},
					{ name: 'pose_13'},
					{ name: 'pose_14'},
					{ name: 'pose_15'},
					{ name: 'pose_16'},
				]
			});
				
			
		this._Animation[0] = new Animation([ // abajo
                { sprite: 'pose_1', time: 0.2 },
                { sprite: 'pose_2', time: 0.2 },
                { sprite: 'pose_3', time: 0.2 },
                { sprite: 'pose_4', time: 0.2 },
                { sprite: 'pose_5', time: 0.2 },
                { sprite: 'pose_6', time: 0.2 },
                { sprite: 'pose_7', time: 0.2 },
                { sprite: 'pose_8', time: 0.2 },
                { sprite: 'pose_9', time: 0.2 },
                { sprite: 'pose_10', time: 0.2 },
                { sprite: 'pose_11', time: 0.2 },
                { sprite: 'pose_12', time: 0.2 },
                { sprite: 'pose_13', time: 0.2 },
                { sprite: 'pose_14', time: 0.2 },
                { sprite: 'pose_15', time: 0.2 },
                { sprite: 'pose_16', time: 0.2 },
            ], this._sprites);      

        
        this._image = new Image();
        this._image.src = data.src;	
        this.speed = data.speed;
		this._posX = data.posX;
		this._posY = data.posY;
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
    
    getPos: function(){    
        return { posX: this._posX, posY: this._posY};
    },
    
    setPose: function(x, y){
	    this._posX = x;
	    this._posY = y;
    },
    
    update: function(ctx, tick, tecla, poseMainCharacter, dialog){
        	
        var distance = Math.sqrt(( (poseMainCharacter.posX/100 - this._posX/100) * (poseMainCharacter.posX/100 - this._posX/100) ) +
		                         ( (poseMainCharacter.posY/100 - this._posY/100) * (poseMainCharacter.posY/100 - this._posY/100) ) );
		                         
        var tileX = Math.floor((this._posX ) /40);
        var tileY = Math.floor((this._posY ) /40);
               
        this._Animation[0].animate( tick );	
        
        var frame = this._Animation[0].getSprite(this._width, this._height);
        
        ctx.drawImage(this._image, frame.x, frame.y, frame.width, frame.height, this._posX, this._posY, frame.width, frame.height);
        
        return{ posX: this._posX, posY: this._posY, distancia: distance };
        
    }       
};
