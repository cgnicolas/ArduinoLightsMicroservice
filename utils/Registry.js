class Registry {
    constructor(){
        this.arduinos = [];
        this.getArduino = this.getArduino.bind(this);
        this.register = this.register.bind(this);
        this.getArduinos = this.getArduinos.bind(this);
        this.getArduinoStates = this.getArduinoStates.bind(this);
    }

    getArduino(name){
        return this.arduinos.filter((el) => el.name === name);
    }
    register(arduino){
        if(this.getArduino(arduino.name)[0]){
            console.log("Duplicate Found. Re-registering: ", arduino.name)
            const foundIndex = this.arduinos.findIndex(el => el.name === arduino.name);
            this.arduinos[foundIndex] = arduino;
        } else {
            console.log("No Duplicate found. Registering: ", arduino.name)
            this.arduinos.push(arduino);
        }
    }
    getArduinos(){
        return this.arduinos;
    }
    getArduinoStates(){
        const states = [];
        this.arduinos.map((el) => {
            const uniques = [];
            //Only Send the name of unique functions
            el.uniqueFunctions.map((func) => {
                uniques.push({
                    name: func.name,
                    type: func.type,
                    state: func.state,
                });
            })
            states.push({
                ...el.state,
                uniqueFunctions: uniques
            });
        })
        return states;
    }
    executeInstruction(name, instruction, payload){
        return new Promise((resolve, reject) => {
            const ard = this.getArduino(name)[0];
            if(ard){
                ard.executeInstruction(instruction, payload)
                .then((result) => {
                    resolve(this.getArduinoStates());
                })
                .catch((err) => {
                    reject(err);
                })
            } else {
                reject("Arduino of name: " + name + " not found");
            }
        })
    }
}

module.exports = Registry;