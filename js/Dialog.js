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
 var Dialog = function(data) {
    this.load(data);   
};

Dialog.prototype = {
    _text: null, // texto
    _index: 0,
    _image:null, // imagen a mostart
    _inicio:0,
    _milis: 5000,
    _cont:0,
	_tam: 45, // numero de letras
    _type:4,
    _nLines: 4, // numero de lineas que se muestran

    load: function(data) {
        this._text  = data.text;
        this._image = new Image();
        this._image.src = data.img;
        this._inicio = new Date().getTime();
        
    },
    
    update: function(ctx, tecla){
    
        var bool = false;
        
        bool = ((new Date().getTime() - this._inicio) < this._milis);
    
        if(tecla == 32 ){ // siguiente dialogo
            bool = false;
        }
    
        if(bool){
            this._index -=this._cont;
        }else{
            this._inicio = new Date().getTime();
            this._cont = 0; 
        }
    
        if( this._text.length - (this._tam*(this._index))>0)
            this.showDialog(ctx); 
        else{
            return -1;
        }

    },
    
    getType: function(){
        return this._type;
    },

    showDialog: function(ctx){
        ctx.fillStyle = "Black";  
        ctx.fillRect(0, 510, 660, 140);   
        ctx.fillStyle = "Blue";  
        ctx.fillRect(10, 520, 620, 110);
        ctx.drawImage(this._image, 0, 0, 96, 76, 20, 535, 80, 80);
        ctx.fillStyle = "White";  
        
        this._cont = 0;
        while(this._text.length - (this._tam*(this._index)) > 0){
	        ctx.font="20px Georgia";
            ctx.fillText(this._text.slice(this._tam*this._index,this._tam*(this._index+1)), 120, 550 + (this._cont*20)); 
            this._index++;
            this._cont++;
            if(this._cont==this._nLines) break;
        }    
        
    },    
    
};
