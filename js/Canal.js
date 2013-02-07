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
 var Canal = function(data) {
    this.load(data);   
};

Canal.prototype = {
    _sprites: [],
    _Animation: [],
    _image: null,
    _posX: 30,
    _posY: 0,
    _last:4,
    speed: 1,
	_olas:0,
    _listerner:null,
    _type:3,
    _width:40,
    _height:40,

    addListener: function( listener){
        this._listeners = listener;
    },

    fire: function(engine){
        var listeners = this._listeners;
        listeners.call(this, engine);
    },
    
    getType: function(){
    
        return this._type;
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
    

    load: function(data) {
        this._sprites = new SpriteSheet({  // indicamos cada uno de los sprites
                width: this._width,
                height: this._heigth,
                Nhori: 3,
                sprites: [
                    { name: 'min', },
                    { name: 'max',},
					]
			});
				
			
		this._Animation[0] = new Animation([ // abajo
                { sprite: 'min', time: 1 },
                { sprite: 'max', time: 1 },
            ], this._sprites);
            
		this._Animation[1] = new Animation([ // abajo
                { sprite: 'min', time: 1 },
            ], this._sprites);
       
        this._image = new Image();
        this._image.src = data.src;	
        this.speed = data.speed;
		this._posX = data.posX;
		this._posY = data.posY;
    },
    
    update: function(ctx, tick){
    	

		this._last = 0;
		
        this._Animation[this._last].animate( tick );	
        var frame = this._Animation[this._last].getSprite(this._width, this._height);
        
        ctx.drawImage(this._image, frame.x, frame.y, frame.width, frame.height, this._posX, this._posY, frame.width, frame.height);   

		
		this._olas--;
			
		var k = 0;
		//for(var i = 0; i < 4; i++){
			if(this._olas > -270){
				
				for(var t = 46; t < 68; t++){
					if(k==0) k=3
					else k = 0
					ctx.beginPath();
					ctx.moveTo(460 + this._olas +k, t);
					ctx.lineTo(460 + this._olas +k, t+1);
					ctx.stroke();
					ctx.closePath();
				}
			}else{
				this._olas = 0;
			}	
		//}
		

		
    },
    
    
};
