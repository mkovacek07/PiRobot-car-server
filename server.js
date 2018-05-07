const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const app = express();

var raspi = require('raspi-io'),
	five = require('johnny-five'),
	board = new five.Board({
		io: new raspi()
	}),
	motors = {};
	
const level = require('./levels');

const server = http.Server(app);
const io = socket(server);

var port = process.env.PORT || 8080;

process.argv.forEach(function (val, index, array) {
    if (index != 1 && index != 0) {

        console.log(val);
    }
});

// board setup
board.on('ready', function() {
  motors = {
    left: new five.Motor({
      pins: {
        pwm: 'P1-35',
        dir: 'P1-13'
      },
      invertPWM: true
    }),
    right: new five.Motor({
      pins: {
        pwm: 'P1-32',
        dir: 'P1-15'
      },
      invertPWM: true
    })
  };

});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log("connection called");

    socket.on('level', (data) => {
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        if (data == "level1") {
            level.level1();
            console.log("finished");
        } else if (data == "level2") {
			level.level2();
			console.log("finished");
        } else if (data == "level3a") {
            level.level3a();
            console.log("finished");
        } else if (data == "level3b") {
            level.level3b();
            console.log("finished");
        } else if (data == "level4") {
            level.level4();
            console.log("finished");
        }
	});
});

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        if (data == "left") {
            left(255);
        } else if (data == "right") {
            right(255);
        } else if (data == "forward") {
            forward(255);
        } else if (data == "backward") {
            backward(255);
        } else if (data == "stop") {
            stop();
        }
    });
});


// motor functions

var forward = function(speed) {
  motors.left.forward(speed);
  motors.right.forward(speed);
};

var backward = function(speed) {
  motors.left.reverse(speed);
  motors.right.reverse(speed);
};

var right = function(speed) {
  motors.left.forward(speed);
  motors.right.reverse(speed);
};

var left = function(speed) {
	  motors.left.reverse(speed);
  motors.right.forward(speed);
};

var stop = function() {
  motors.left.stop();
  motors.right.stop();
};

app.use('/', express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
    console.log("Socket Port: " + port);
});

module.exports.forward = forward;
module.exports.backward = backward;
module.exports.left = left;
module.exports.right = right;
module.exports.stop= stop;

