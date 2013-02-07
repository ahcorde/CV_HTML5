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

var keys = {
	none  : 0,
	left  : 37,
	up    : 38,
	right : 39,
	down  : 40,
};

var zone = {
    Room        :   0,
    Boat        :   1,
    Lab         :   2,
    robot       :   3,
    
}

var types = {
	MainCharacter 	: 	0,
	Map				:	1,
	Character		:	2,
	Animated 		:	3,
	Dialog			:	4,
	StaticCharacter	:	7,
};

var distance = function distance(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1 - y2));
};

