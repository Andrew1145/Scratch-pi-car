(function(ext) {
    // Code to be run when the user closes the window, reloads the page, etc.    
    ext._shutdown = function() {};
    
    // Shows the status of the extension 0 = red, 1 = yellow, and 2 = green
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    baseUrl = "http://localhost:5000/";
    var endChar = '\n';
    var intervalChar = '#';
    var turnRatio = 2;
    var net = require('net');
    var client = new net.Socket();
    ext.connect = function (ipadd, callback){
        client.connect(5000,ipadd,callback);
    };

    ext.disconnect = function () {
        client.destroy();
    };

/*    ext.cUp = function (angle, callback) {
        $.ajax({
            url: baseUrl + 'cUp/' + angle.toString(),
            dataType: 'text',
            success: function (data) {
                callback();
            }
        });
    };

    ext.cDown = function (angle, callback) {
        $.ajax({
            url: baseUrl + 'cDown/' + angle.toString(),
            dataType: 'text',
            success: function (data) {
                callback();
            }
        });
    };

    ext.cLeft = function (angle, callback) {
        $.ajax({
            url: baseUrl + 'cLeft/' + angle.toString(),
            dataType: 'text',
            success: function (data) {
                callback();
            }
        });
    };

    ext.cRight = function (angle, callback) {
        $.ajax({
            url: baseUrl + 'cRight/' + angle.toString(),
            dataType: 'text',
            success: function (data) {
                callback();
            }
        });
    };

    ext.centerCamera = function (callback) {
        $.ajax({
            url: baseUrl + 'centerCamera/',
            dataType: 'text',
            success: function (data) {
                callback();
            }
        });
    };
*/

    ext.move = function (s1, s2, s3, s4) {
        var data = 'CMD_MOTOR' + intervalChar + s1.toString() + intervalChar + s2.toString() + intervalChar + s3.toString() + intervalChar + s4.toString() + endChar;
        client.write(data);
    };

    ext.moveForward = function (speed) {
        ext.move(speed, speed, speed, speed);
    };

    ext.moveBackward = function (speed) {
        ext.moveForward(-speed);
    };

    ext.stop = function () {
        ext.moveForward(0);
    };

    ext.stepForward = function (speed, duration, callback) {
        ext.moveForward(speed);
        setTimeout(ext.stop(), duration*1000); 
        callback();
    };

    ext.stepBackward = function (speed, duration, callback) {
        ext.stepForward(-speed, duration, callback);
    };

    ext.turnLeft = function (speed) {
        ext.move(-speed/turnRatio, -speed/turnRatio, speed, speed);
    }

    ext.turnRight = function (speed) {
        ext.move(speed, speed, -speed/turnRatio, -speed/turnRatio);
    }

    ext.stepLeft = function (speed, duration, callback) {
        ext.turnLeft(speed);
        setTimeout(ext.stop(), duration*1000);
        callback(); 
    };

    ext.stepRight = function (speed, duration, callback) {
        ext.turnRight(speed);
        setTimeout(ext.stop(), duration*1000);
        callback(); 
    };

    ext.setLedMode = function(mode) {
        var data = 'CMD_LED_MOD' + intervalChar + mode.toString() + endChar
        client.write(data);
    };

    ext.setLed = function(idx,R,G,B) {
        var data = 'CMD_LED' + intervalChar + idx.toString() + intervalChar + R.toString() + intervalChar + G.toString() + intervalChar + B.toString() + endChar;
        client.write(data);
    };

    ext.LedOff = function() {
        ext.setLedMode(0);
    };

/*    ext.center = function (callback) {
        $.ajax({
            url: baseUrl + 'center/',
            dataType: 'text',
            success: function (data) {
                callback();
            }
        });
    };

    ext.lightRed = function () {
        $.ajax({
            url: baseUrl + 'lightRed/',
            dataType: 'text',
            success: function (data) {
            }
        });
    };

    ext.lightGreen = function () {
        $.ajax({
            url: baseUrl + 'lightGreen/',
            dataType: 'text',
            success: function (data) {
            }
        });
    };

    ext.lightBlue = function () {
        $.ajax({
            url: baseUrl + 'lightBlue/',
            dataType: 'text',
            success: function (data) {
            }
        });
    };

    ext.buzz = function (duration) {
        setTimeout(function () {
            $.ajax({
                url: baseUrl + 'buzz/' + duration.toString(),
                dataType: 'text',
                success: function (data) {
                }
            });
        }, 10)
    };

    ext.buzzWait = function (duration, callback) {
        $.ajax({
            url: baseUrl + 'buzz/' + duration.toString(),
            dataType: 'text',
            success: function (data) {
                callback();
            }
        });
    };

    ext.distance = function (callback) {
        $.ajax({
            url: baseUrl + 'distance/',
            dataType: 'text',
            success: function (data) {
                callback(data);
            }
        });
    };

    ext.lastError = function (callback) {
        $.ajax({
            url: baseUrl + 'lastError/',
            dataType: 'text',
            success: function (data) {
                callback(data);
            }
        });
    };

    ext.lastMessage = function (callback) {
        $.ajax({
            url: baseUrl + 'lastMessage/',
            dataType: 'text',
            success: function (data) {
                callback(data);
            }
        });
    };
*/
    // Descriptions of the blocks and menus the extension adds
    var descriptor = {
        "blocks": [
            ["w", "Connect to %s", "connect", "192.168.1.139"],
//            [" ", "Switch wheel direction: %m.direction", "direction", "reverse"],
            [" ", "Disconnect", "disconnect"],
//            ["w", "Camera up %n degrees", "cUp", 10],
//            ["w", "Camera down %n degrees", "cDown", 10],
//            ["w", "Camera left %n degrees", "cLeft", 10],
//            ["w", "Camera Right %n degrees", "cRight", 10],
//            ["w", "centerCamera", "centerCamera"],
            [" ", "Move Forward at speed %n", "moveForward", 1000],
            [" ", "Move Backward at speed %n", "moveBackward", 1000],
            [" ", "stop", "stop"],
// Need to work out how to get "w" (wait for response) to work            ["w", "Step Forward at speed %n for %n s", "stepForward", 1000, 1],
//            ["w", "Step Backward at speed %n for %n s", "stepBackward", 1000, 1],
            [" ", "Turn Left at speed %n", "turnLeft", 2000],
            ["w", "Turn Left at speed %n for %n s", "stepLeft", 2000, 2],
            [" ", "Turn Right at speed %n", "turnRight", 2000],
            ["w", "Turn Right at speed %n for %n s", "stepRight", 2000, 2],
            [" ", "LED show mode %m.mode", "setLedMode", 1],
            [" ", "Set LED number %n to RGB value %n,%n,%n", "setLed"],
            [" ", "Turn LEDs off","LedOff"]
//            ["w", "center", "center"],
//            [" ", "Toggle Red light", "lightRed"],
//            [" ", "Toggle Green light", "lightGreen"],
//            [" ", "Toggle Blue light", "lightBlue"],
//            [" ", "Buzz for %n ms", "buzz", 1000],
//            ["w", "Buzz and Wait for %n ms", "buzzWait", 1000],
//            ["R", "distance", "distance"],
//            ["R", "lastError", "lastError"],
//            ["R", "lastMessage", "lastMessage"]
        ],
        menus: {
            mode: [1,2,3,4]
        }
    };
    // Register the extension
    ScratchExtensions.register('piCar', descriptor, ext);
})({});
