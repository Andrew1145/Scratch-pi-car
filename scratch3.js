class PiCar {

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
                },
                {
                    "opcode": "disconnect",
                    "blockType": "command",
                    "text": "Disconnect TCP server connection"
                    }
                },
                {
                    "opcode": "setLedMode",
                    "blockType": "command",
                    "text": "Start LED show in mode [mode]",
                    "arguments": {
                        "mode": {
                            "type": "string",
                            "defaultValue": "1"
                        }
                    }
                },
                {
                    "opcode": "setLed",
                    "blockType": "command",
                    "text": "Set LED number [LED] to RGB value [R],[G],[B]",
                    "arguments": {
                        "LED": {
                            "type": "string",
                            "defaultValue": "1"
                        },
                       "R": {
                           "type": "string",
                            "defaultValue": "255"
                       },
                       "G": {
                           "type": "string",
                            "defaultValue": "255"
                       },
                       "B": {
                           "type": "string",
                            "defaultValue": "255"
                       }
                    }
                },
                {
                    "opcode": "LedOff",
                    "blockType": "command",
                    "text": "Turn LEDs off",
                }
            ]
        };
    }
    
    connect(string) {
    }
}
Scratch.extensions.register(new PiCar());
