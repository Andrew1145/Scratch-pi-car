const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const endChar = '\n';
const intervalChar = '#';
const nets = require('nets');
const client = new net.Socket();
const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADTUlEQVRIS63VTWgUZxgH8P+7Mzsf+2U2SrPJKBoEA1WKUMzupaKHpgoetadCnaBN9FRaLLRQEW17KKIed1V21dJLbU/FRqiixx219NDaVi+NmnWNZT+cze7Ozsf7yoxEYpnMRJI5DQzP+5v3P8/7DEHANVHM7iXAVyAkwQCNgZYjDp3KH7jzZ1DdwmckBLirrE29KQgcTNOBZTrQdYP2es631LSPnp34zQqDlgTIcvTlOowxNBsG6o3uHw6he899eOt+EBIGeBHxUW5ElDjEYwKSKdFbzzAsVB61/q4lWlsvv3/XXAwJBOaL9pe29slE3MgoOSHF+N0DAwnwfASNehe1WudkYVw7sixgYfFkMXtSikU/VZQU3LhmHjVZ17Sz59Tbt/2QJe3glUIGMnEhe3PgjcR2Ny5dN/Df0873ebX8gS/wshUBUMK+PKveuhzWGZPF0fdiceHq4FAK3a6FyoyuFca13GKA14ruw8qM/ldhXNscBnz03duDUSY83jCchu04ePBvs5ZXtTW+wGQpW12/IZ1xP9r0dAM9g2bOH9Rmg5DDpW0ZwvFVD7CpW1ctqNqQP1DM/ZJRErvdFqw+bqHdMccKqvZr4AEsbdsVj4lTbkTttolqtXWloGp7FtlB7uv+1fIX6bSM9pyJJ9W5a3m1PAYC5ou4H7mUvT44mNwZTwio17to1Dsn8qp21Bc4cGl0WCLcP+vW9wkRQrxddNrW6cyw9NmxnTfthUX7ftgs9LcTP8dkfmxIWeW16cOHTdO22EheLU8v2qYTxezn6bT8zeo1MS/T2dk5GB3rHgNOMd6+SsFxnE3eJcAnohwdUZQkQAjqtTYadePHwri2L/CgHbuxg3/ywPhdUZJbJOnF3GnpPS9fw7ABAkgij3h8flS46REYPRvVig5KoebV8oXAg3bw4ugmjkV+6u+Xt/T1SSDE/wy6sTxrdiHHBYgCH4q8ssqLjOPHZYk/kkiKEUHg4Y5qBgbLpDBNG62W5Rhde4rjsGdISUEUgxHf1zx0MfsWdTBGCHIAeQeABbAyBdPmfziTpdz+SASlMOT1Z9GCoJeCLAtwrTBk2UAYsiKAH+JN2YreXDHg/wilzJ3Oz1YUmEcYY2fce0LIx88BFi6vvp70RPYAAAAASUVORK5CYII=";


class PiCar {
    constructor () {}

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
            name: 'PiCar',
            color1: '#8BC34A',
            color2: '#7CB342',
            color3: '#689F38',
            menuIconURI: icon,
            blocks: [{
                    opcode: 'connect',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Connect to IP address [string]',
                    arguments: {
                        string: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '192.168.1.139'
                        }
                    }
                },
                {
                    opcode: 'disconnect',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Disconnect TCP server connection'
                },
                {
                    opcode: 'setLedMode',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Start LED show in mode [mode]',
                    arguments: {
                        mode: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'setLed',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Set LED number [LED] to RGB value [R],[G],[B]',
                    arguments: {
                        LED: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1'
                        },
                       R: {
                           type: Scratch.ArgumentType.STRING,
                           defaultValue: '255'
                       },
                       G: {
                           type: Scratch.ArgumentType.STRING,
                           defaultValue: '255'
                       },
                       B: {
                           type: Scratch.ArgumentType.STRING,
                           defaultValue: '255'
                       }
                    }
                },
                {
                    opcode: 'LedOff',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Turn LEDs off'
                }
            ]
        };
    }
}

Scratch.extensions.register(new PiCar());
