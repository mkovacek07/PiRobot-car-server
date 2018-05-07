const control = require('./server');
var sleep = require('sleep');

var forward = function() {
	control.forward(255);
	sleep.sleep(1);
	control.stop();
	sleep.msleep(500);
};

var backward = function() {
	control.backward(255);
	sleep.sleep(1);
	control.stop();
	sleep.msleep(500);
};

var right = function() {
	control.right(175);
	sleep.sleep(1);
	control.stop();
	sleep.msleep(400);
};

var left = function() {
	control.left(175);
	sleep.sleep(1);
	control.stop();
	sleep.msleep(400);
};

function level1(){
	forward();
};

function level2(){
	forward();
	forward();
	backward();
};

function level3a(){
	forward();
	sleep.msleep(1500);
	left();
	forward();
};

function level3b(){
	forward();
	right();
	forward();
};

function level4(){
	forward();
	left();
	forward();
	left();
	forward();
	left();
	forward();
};

module.exports = {
	level1: level1,
	level2: level2,
	level3a: level3a,
	level3b: level3b,
	level4: level4
};
