const ip = require('ip');
module.exports = {
    service : {
        name: "Arduino",
        description: "Used to view the status and control Arduinos",
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