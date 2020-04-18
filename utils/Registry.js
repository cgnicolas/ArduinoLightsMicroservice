class Registry {
    constructor(){
        this.arduinos = [];
        this.findArduino = this.findArduino.bind(this);
        this.register = this.register.bind(this);
        this.getArduinos = this.getArduinos.bind(this);
    }

    findArduino(name){
        return this.arduinos.filter((el) => el.name === name);
    }
    register(arduino){
        this.arduinos.push(arduino);
    }
    getArduinos(){
        return this.arduinos;
    }
    executeInstruction(name, instruction, payload){
        return new Promise((resolve, reject) => {
            const ard = this.findArduino(name)[0];
            if(ard){
                ard.executeInstruction(instruction, payload)
                .then((result) => {
                    resolve(result);
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