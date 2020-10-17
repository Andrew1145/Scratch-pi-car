class PiCar { //In both instances, NitroBlock will be the name in both instances

    getInfo() {
        return {
            "id": "PiCar",
            "name": "PiCar",
            "blocks": [{
                    "opcode": "connect",
                    "blockType": "command",
                    "text": "Connect to IP address [string]",
                    "arguments": {
                        "string": {
                            "type": "string",
                            "defaultValue": "192.168.1.139"
                        }
                    }
            }],
            "menus": { //we will get back to this in a later tutorial
            }
        };
    }
    
    connect(string) {
    }
}
Scratch.extensions.register(new PiCar());
