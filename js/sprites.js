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
 var SpriteSheet = function(data){
    this.load(data);
};

SpriteSheet.prototype = {
    _sprites: null,
    _Nhori: 4,
    
    load: function(data){
        this._sprites = data.sprites;
        this._Nhori = data.Nhori;
    },
    
    getOffset: function(spriteName, width, height) {  // devuelve el sprite que coincida con el nombre
        for(var i = 0, len = this._sprites.length; i < len; i++) {
            var sprite = this._sprites[i];
            var j =0;

            if(sprite.name == spriteName) {

                    if(i > this._Nhori -1 )
                        j = height;
                    
                    
                    if(i>this._Nhori*2 -1)
                        j = height*2;  
                    
                    if(i> this._Nhori*3 -1)
                        j = height*3; 
                                                
                    i = i%this._Nhori;    
                                       
                return {
                    x: (i * width) + (sprite.x||0),
                    y: j + ( sprite.y||0),
                    width: width,
                    height: height
                };
            }
        }
        
        return null;
    }
    
    
}
