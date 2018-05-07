var raspi = require('raspi-io'),
	five = require('johnny-five'),
	board = new five.Board({
		io: new raspi()
	}),
	//motors = {};

/*
function setup() {
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
}*/

function forward() {
	motors.left.forward(255);
	motors.right.forward(255);
};

function backward() {
	motors.left.reverse(255);
	motors.right.reverse(255);
};

function right() {
	motors.left.forward(255);
	motors.right.reverse(255);
};

function left() {
	motors.left.reverse(255);
	motors.right.forward(255);
};

function stop() {
	motors.left.stop();
	motors.right.stop();
};

function sleep(){
	motors.left.forward(255);
	motors.right.forward(255);
	board.wait(1000, function() {
		stop();
	});
};

module.exports = {
	setup: setup,
    forward: forward,
    backward: backward,
    left: left,
    right: right,
    stop: stop,
    sleep: sleep
};
