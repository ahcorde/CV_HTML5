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
 function InputManager() {
    this.keyState = [];
    this.keyCurrent = [];
    this.keyLast = [];
    this.tecla = 0;
    var self = this;


    window.addEventListener('keydown', function(ev){
        self.keyCurrent[ev.which] = true;
        self.keyState[ev.which] = true;
        self.tecla = ev.which;

    });
        window.addEventListener('keyup', function(ev){
        self.keyState[ev.which] = false;
    });
}


InputManager.prototype.update = function(){
    this.keyLast = this.keyCurrent;
    this.keyCurrent = this.keyState.slice(0);
    if(!this.isKeyDown(this.tecla)){
        this.tecla = 0;
    }
    return this.tecla;
};


InputManager.prototype.isKeyDown = function(key){
  return !!this.keyCurrent[key];
};


InputManager.prototype.isKeyTriggered = function(key){
  return !!this.keyCurrent[key] && !this.keyLast[key];
};


InputManager.prototype.isKeyReleased = function(key){
  return !this.keyCurrent[key] && !!this.keyLast[key];
};


