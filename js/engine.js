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
//Actualizacion de la ventana -> 60fps
window.requestAnimateFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();


var Engine = function (data) {
    this.load(data);
};

Engine.prototype = {
    _canvas: 0, //lienzo
    _stats:0, //stats
    _dialog: 0,
    
    _inputManager: null, // Teclas
    _dialog: false, // dialogo activo
    
    _wallLastTimeStamp: 0, 
    _gameTime: 0, 
    _maxStep: 0.05,
    _lastPosPlaye:[],
    
    _map: 0,
    _characters: 0,
    _mainCharacter: 0,
        
    // constructor    
    load: function(data){
        this._canvas = data.ctx;
        this._stats = data.stats;
        this._map = data.map;
        this._characters = data.characters;
		this._mainCharacter = data.mainCharacter,
        
        this._inputManager = new InputManager();
    },
    
    setDialog: function(dialog){
    	this._dialog = dialog;
    },
    
    // tick para el tiempo
    tick: function() {
        var wallCurrent = Date.now();
        var wallDelta = (wallCurrent - this._wallLastTimeStamp)/1000;
        this._wallLastTimeStamp = wallCurrent;
        
        var gameDelta = Math.min(wallDelta, this._maxStep);
        this._gameTime +=gameDelta;

        return gameDelta
    },
}

// bucle principal
Engine.prototype.loop = function(){

	// actualiza las estadisticas
    this._stats.update();
    
    // actualiza la telca que ha sido pulsada
    var tecla = this._inputManager.update();
    
    // comprueba si hay algún dialogo activo
    /*if(this._dialog){
        if(tecla!=32)
            tecla = 0;
    }
    */
    // actualiza el delta de tiempo
    var tick = this.tick();
        
    var distance = 0;
    var posPlayer = [];
    
    /* MAPA */
    this._map.update(this._canvas);
    
    
    
    var encima = 0;
    for(var c in this._characters){
        var character = this._characters[c];
        distancia  = Math.sqrt((this._mainCharacter._posY - character._posY)*(this._mainCharacter._posY - character._posY) + (this._mainCharacter._posX - character._posX)*(this._mainCharacter._posX - character._posX));
                
        if(this._mainCharacter._posY > character._posY && distancia < 40)
        	encima = 1;
    }
    


	// Main Character //
	poseMainCharacter = this._mainCharacter.update(this._canvas, tick, tecla, this._lastPosPlayer, this._map._tileWalk, this._map._walk,
													this._map._change); 
													
	if(poseMainCharacter.indiceCambioMapa>0){
		this._characters = this._map.setZone(poseMainCharacter.indiceCambioMapa, this._mainCharacter); 
		return;
	}

	// Other Characters    
    for(var c in this._characters){
		/* Patrullas */
        var character = this._characters[c];
        if(character.getType()!=3){
            posPlayer[c] = character.update(this._canvas, tick, tecla, poseMainCharacter,  this._dialog);

            if( tecla == 32 && this._dialog==0 && posPlayer[c].distancia < 0.40 ){ //accion
                character.fire(this);
                this._inputManager.tecla= 0;
            }
        }else{
            character.update(this._canvas, tick);
        }
    }

	if(encima!=0 )
    	this._mainCharacter.draw(this._canvas);  
        /*
    // Se recorren los objetos para actualizarlos
    for(var o in this._objects){
        var object = this._objects[o];
        var type = object.getType( );
        
        if(type==0){ // Main Character //
            distance = object.update(this._canvas, tick, tecla, posPlayer, map._tileWalk, map._walk);  
        }
                                       
        if(type==1){ 
            object.update(this._canvas);
        }
        
        if(type==2){ // Patrullas //
            posPlayer = object.update(this._canvas, tick, tecla, this._lastPosPlayer,  this._dialog);
            console.log("Patrulla");
            if( tecla == 32 && !this._dialog && distance < 0.3 ){ //accion
                object.fire(this);
                this._inputManager.tecla= 0;
            }
        }
        
        if(type==3 || type==7){ // Canal y tanque Static//
            object.update(this._canvas, tick);
        }
                
    }
    */
    
    if(this._dialog!=0){ /* Dialogos */
	    if(this._dialog.update(this._canvas, tecla) ==-1 )
	    	this._dialog= 0; 
		this._inputManager.tecla = 0;
	}
	
	this._lastPosPlayer = posPlayer;
	
}


Engine.prototype.start = function(ctx){
    console.log("Starting Engine");
    var self = this;
    (function gameLoop(){
        self.loop();
        requestAnimateFrame(gameLoop, self._canvas.canvas);
    })();    
}


/*
Engine.prototype.showDialog = function(text){
    var dialog = new Dialog({text:text, img:'img/cara.png'});

    this._objects[this._objects.length] =   dialog;  
    
    this._dialog = true;
}

Engine.prototype.update = function(){
    this._inputManager.udpate();
    this.map.update();
    this.player.update();
    for(var o in this._objects){
        var object = this._objects[0];
        if(!object.dead){
            object.update();
        }
    }
    for(var i = this._objects.length-1; i>=0; --i){
        if(this._objects[i].dead){
            this._objects.splice(i, 1);
        }
    }
}

Engine.prototype.draw = function(drwaCallback){
    this._canvas = clearRect(0, 0 ,  this._canvas.canvas.width, this._canvas.canvas.heigth);
    this._canvas.save();
    this._canvas.translate(this._canvas.canvas.width/2, this._canvas.canvas.height/2);
    this.map.draw(this._canvas);
    for(var i = 0; i < this._objects.lenght; i++){
        this._objects[i].draw(this._canvas);
    }
    if(drawCallback){
        drawCallback(this);
    }
    this.player.draw(this._canvas);
    this._canvas.restore();
}
*/
