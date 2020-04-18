const axios = require('axios');
const API = require('./API');
const EventEmitter = require('events');
class Arduino {
    constructor(type, name, arduinoURL, options){
        this.url = arduinoURL;
        this.type = type;
        this.name = name;
        this.options = options;
        this.state = {};
        this.emitter = new EventEmitter();
        this.bindFunctions = this.bindFunctions.bind(this);
        this.bindFunctions();
    }

    bindFunctions(){
        this.executeInstruction = this.executeInstruction.bind(this);
        this._invokeInstruction = this._invokeInstruction.bind(this);
        this._setColor = this._setColor.bind(this);
    }

    executeInstruction(instruction, payload){
        console.log("Execute");
        return new Promise((resolve, reject) => {
           this._invokeInstruction(instruction, payload)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
        })
    }

    _invokeInstruction(instruction, payload){
        switch (instruction){
            case 'setcolor':
                return new Promise((resolve, reject) => {
                    const {rgb} = payload;
                    this._setColor(rgb)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    })
                })
            default:
                return;
        }
    }

    _setColor(rgb){
        return new Promise((resolve, reject) => {
            const r = rgb[0];
            const g = rgb[1];
            const b = rgb[2];
            const url = this.url +'/setcolor/' + `${r}/${g}/${b}`;
            console.log(url);
            axios.get(url)
            .then((result) => {
                //Set new Arduino State
                //Resolve with no args because all ards will be sent to dash
                this.state = result.data;
                resolve(null);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
}

module.exports = Arduino;