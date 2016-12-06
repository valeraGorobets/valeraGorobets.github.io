const width = 1100;
const height = 600;
var canvas;
var ctx;

var ninja;
var backgroundImage;

var ninjaSpeed = 300;
var wallSpeed = ninjaSpeed;
var knifeSpeed = 3 * ninjaSpeed;
var extraLifeSpeed = ninjaSpeed;
var knifedifficulty = 4;

var walls = [];
var knifes = [];
var extralifes = [];
var teleport = [];

var lastTime;
var lastJumped = Date.now();
var lastEnemy = Date.now();
var isGameOver;


var score = 0;
var scoreEl = document.getElementById('score');