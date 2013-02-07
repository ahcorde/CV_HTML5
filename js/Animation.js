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
 var Animation = function(data, sprites) {
    this.load(data);
    this._sprites = sprites;
};

Animation.prototype = {
    _frames: new Array(),
    _frame: null,
    _frameDuration: 0,

    load: function(data) {
        this._frames = data;
        this._frameIndex = 0;
        this._frameDuration = data[0].time;
    },

    animate: function(deltaTime) {
        this._frameDuration -= deltaTime;
        if(this._frameDuration <= 0) {
            this._frameIndex++;
            if(this._frameIndex == this._frames.length) {
                this._frameIndex = 0;
            }

            this._frameDuration = this._frames[this._frameIndex].time;
        }
    },

    getSprite: function(width, height) {
        return this._sprites.getOffset(this._frames[this._frameIndex].sprite, width, height);
    }
};
