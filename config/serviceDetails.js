const ip = require('ip');
module.exports = {
    service : {
        name: "Arduino",
        description: "A Registry and Controller for Wifi enabled Arduinos",
        port: 4003,
        ip: ip.address(),
        procedures: [
            {
                name: 'setcolor',
                options: {
                    method: 'POST',
                    path: '/process/set/color'
                }
            }
        ]
    }
    
}