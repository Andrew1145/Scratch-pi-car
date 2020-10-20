const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const endChar = '\n';
const intervalChar = '#';
const nets = require('nets');
const client = new net.Socket();


class PiCar {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    connect(ipadd, callback){
        client.connect(5000,ipadd,callback);
    }

    disconnect() {
        client.destroy();
    }

    setLedMode(mode) {
        var data = 'CMD_LED_MOD' + intervalChar + mode.toString() + endChar
        client.write(data);
    }

    setLed(idx,R,G,B) {
        var data = 'CMD_LED' + intervalChar + idx.toString() + intervalChar + R.toString() + intervalChar + G.toString() + intervalChar + B.toString() + endChar;
        client.write(data);
    }

    LedOff() {
        PiCar.setLedMode(0);
    }

    getInfo() {
        return {
            id: 'picar',
            name: 'picar',
            blocks: [{
                    opcode: 'connect',
                    blockType: BlockType.COMMAND,
                    text: 'Connect to IP address [string]',
                    arguments: {
                        string: {
                            type: ArgumentType.STRING,
                            defaultValue: '192.168.1.139'
                        }
                    }
                },
                {
                    opcode: 'disconnect',
                    blockType: BlockType.COMMAND,
                    text: 'Disconnect TCP server connection'
                },
                {
                    opcode: 'setLedMode',
                    blockType: BlockType.COMMAND,
                    text: 'Start LED show in mode [mode]',
                    arguments: {
                        mode: {
                            type: ArgumentType.STRING,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'setLed',
                    blockType: BlockType.COMMAND,
                    text: 'Set LED number [LED] to RGB value [R],[G],[B]',
                    arguments: {
                        LED: {
                            type: ArgumentType.STRING,
                            defaultValue: '1'
                        },
                       R: {
                           type: ArgumentType.STRING,
                           defaultValue: '255'
                       },
                       G: {
                           type: ArgumentType.STRING,
                           defaultValue: '255'
                       },
                       B: {
                           type: ArgumentType.STRING,
                           defaultValue: '255'
                       }
                    }
                },
                {
                    opcode: 'LedOff',
                    blockType: BlockType.COMMAND,
                    text: 'Turn LEDs off'
                }
            ]
        };
    }
}

module.exports = Scratch3Picar;