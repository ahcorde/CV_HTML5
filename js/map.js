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
 var Map = function(data) {
    this.load(data);
};

Map.prototype = {
    _world:         null,
    _image:         null,
    _tile:          [],
	_walk:          [],
    _zone:          0, // empieza en habitacion
    _type:          1, /* Tipo mundo */
    _sizeXTile:     40,
    _sizeYTile:     40,
    _tileWalk:      40,

    load: function(data) {       
    
        this._world = data.World;
        this._image = new Image();

        this.setZone(this._zone);
    
    },
    
    getType: function(){
        return this._type;
    },
    
    setZone:function(z, mainCharacter){
        
        if(z == 8){
            z = 0;
        }
    
        var anterior = this._zone;
        this._zone = z;

        this._image.src = this._world[this._zone].filename;	
        this._tile = this._world[this._zone].tiles;
		this._walk = this._world[this._zone].walk;
		this._tileWalk = this._world[this._zone].tileWalk;
		this._change = this._world[this._zone]._change;
		if(mainCharacter!=null){
            console.log(this._world[this._zone].initialPose.length)
            if(this._world[this._zone].initialPose.length==1){
                console.log("X: " + this._world[this._zone].initialPose[0][0] + " " + this._world[this._zone].initialPose[0][1])
                mainCharacter._posX = this._world[this._zone].initialPose[0][0];
                mainCharacter._posY = this._world[this._zone].initialPose[0][1];
            }else{
                console.log("Anterior: " + anterior + " " + this._world[this._zone].initialPose[anterior])
                mainCharacter._posX = this._world[this._zone].initialPose[anterior][0];
                mainCharacter._posY = this._world[this._zone].initialPose[anterior][1];
            }
		}
        return this._world[this._zone].characters;
    },
    
    update: function(ctx){
        
		for( var j = 0; j< this._tile.length; j++){ // las capas
			var indexX = 0;
		    var indexY = 0;
		    for(var i= 0; i < this._tile[j].length; i++){
                ctx.drawImage(  this._image,
                                this._tile[j][i][1]*this._sizeXTile,
                                this._tile[j][i][0]*this._sizeYTile,
                                this._sizeXTile,
                                this._sizeYTile,
                                indexX*this._sizeXTile,
                                indexY*this._sizeYTile,
                                this._sizeXTile,
                                this._sizeYTile);                           
                if(indexX == 15 ){
                    indexX = 0;
                    indexY++;
                    continue;
                }    
                indexX++;        
		    }
	    }
    }
    
};
