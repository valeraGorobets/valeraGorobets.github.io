var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function createCanvas() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    document.getElementById("wrapper").appendChild(canvas);
})()

var resources = new Resources();
resources.load('img/spritesheet.png');
resources.onReady(init);

function init() {
    document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });
    backgroundImage = {
        pos: [0, 0],
        sprite: new Sprite('img/spritesheet.png', [0, 937], [1100, 600], 100, 2, true)
    }
    newGame();
    lastTime = Date.now();
    main();
}

function newGame() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;
    ninja = new Ninja([100, 130], new Sprite('img/spritesheet.png', [0, 0], [232, 439], 15, 9))
}

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    lastTime = now;
    requestAnimFrame(main);
}

function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    score = 0;
    ninja = new Ninja([50, 422], new Sprite('img/spritesheet.png', [-10, 439], [118, 150], 17, 10));
    walls = [];
}

function update(dt) {
    handleInput(dt);
    updateEntities(dt);
    if (!isGameOver) {
        generateKnifes();
        generateWalls();
        generateExtraLifes()
    }
    checkCollisions();
    scoreEl.innerHTML = score;
}

function handleInput(dt) {
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 32) {
            if (Date.now() - lastJumped > 200 && !isGameOver) {
                changePlane();
                lastJumped = Date.now();
            }
        }
        if (event.keyCode == 78) {
            knifedifficulty = 10;
        } else {
            knifedifficulty = 4;
        }
    });
}

function changePlane() {
    if (ninja.isOnGround) {
        ninja.dir = 'upsideDown';
        ninja.isOnGround = false;
        ninja.pos[1] = 200;
    } else {
        ninja.dir = 'normal';
        ninja.isOnGround = true;
        ninja.pos[1] = 420;
    }
    teleportObject = {
        pos: ninja.pos,
        sprite: new Sprite('img/spritesheet.png', [0, 589], [100, 136],
            26, 18, false, true)
    };
    if (ninja.dir == 'upsideDown') {
        teleportObject.dir = 'upsideDown';
    }
    teleport.push(teleportObject);
}

function updateEntities(dt) {
    ninja.sprite.update(dt);
    if (!isGameOver) {
        updateBackground()
        updateArrayOfObjects(walls, wallSpeed);
        updateArrayOfObjects(knifes, knifeSpeed);
        updateArrayOfObjects(extralifes, extraLifeSpeed);
        updateArrayOfObjects(teleport, 0);
    }

    function updateBackground() {
        backgroundImage.pos[0] -= ninjaSpeed * dt;
        if (backgroundImage.pos[0] <= -width) {
            backgroundImage.pos[0] = 0;
        }
    }

    function updateArrayOfObjects(arr, speed) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].pos[0] -= speed * dt;
            arr[i].sprite.update(dt);
            if (arr[i].pos[0] + arr[i].sprite.size[0] < 0) {
                arr.splice(i, 1);
                i--;
            }
        }
    }
}

function generateKnifes() {
    if (Math.random() < 0.01 * knifedifficulty) {
        knifes.push({
            pos: [canvas.width, Math.random() * (canvas.height - 100 - 40) + 40],
            sprite: new Sprite('img/spritesheet.png', [0, 775], [160, 32], 6, 1)
        });
    }
}

function generateWalls() {
    if (Date.now() - lastEnemy > 2000) {
        let wallRandomNumber = Math.floor(Math.random() * 10);
        let wallObject = {
            sprite: new Sprite('img/spritesheet.png', [0, 807], [48, 121], 0, 1)
        }
        if (wallRandomNumber % 2 == 0) {
            wallObject.pos = [width, 450];
        } else {
            wallObject.pos = [width, 190];
            wallObject.dir = 'upsideDown';
        }
        walls.push(wallObject);
        lastEnemy = Date.now();
        score++;
    }
}

function generateExtraLifes() {
    let difficulty = 1;
    if (Math.random() < 0.01 * difficulty) {
        let lifeRandomNumber = Math.floor(Math.random() * 10);
        let extralifeObject = {
            sprite: new Sprite('img/spritesheet.png', [5, 725], [50, 50], 10, 8)
        };
        if (lifeRandomNumber % 2 == 0) {
            extralifeObject.pos = [width, 470];
        } else {
            extralifeObject.pos = [width, 170];
        }
        extralifes.push(extralifeObject);
    }
}

function checkCollisions() {

    check(walls, newGame, true);
    check(extralifes, collisionWithExtraLife);
    check(knifes, collisionWithKnife, true);

    function check(arr, ifCollision, isCollisionReverce = false) {
        for (var i = 0; i < arr.length; i++) {
            var pos = arr[i].pos;
            var size = arr[i].sprite.size;
            if (ninja.dir == 'upsideDown') {
                if (boxCollision(pos, size, [ninja.pos[0], ninja.pos[1] - 1 * ninja.sprite.size[1]], ninja.sprite.size)) {
                    ifCollision(i);
                }
            } else {
                if (boxCollision(pos, size, ninja.pos, ninja.sprite.size)) {
                    ifCollision(i);
                }
            }
        }
    }

    function collisionWithExtraLife(i) {
        ninja.health += 50;
        if (ninja.health >= 100) {
            ninja.health = 100;
        }
        extralifes.splice(i, 1);
    }

    function collisionWithKnife(i) {
        ninja.health -= 10;
        if (ninja.health <= 0) {
            newGame();
        }
        knifes.splice(i, 1);
    }
}


function boxCollision(pos, size, pos2, size2) {
    let width1 = pos[0] + size[0];
    let height1 = pos[1] + size[1];
    let width2 = pos2[0] + size2[0];
    let height2 = pos2[1] + size2[1];
    return collision(pos[0], pos[1], width1, height1, pos2[0], pos2[1], width2, height2);
}

function collision(x, y, width1, height1, x2, y2, width2, height2) {
    return !(width1 <= x2 || x > width2 || height1 <= y2 || y > height2);
}

function render() {
    renderEntity(backgroundImage);
    if (!isGameOver) {
        renderEntities(walls);
        renderEntities(extralifes);
        renderEntities(teleport);
        renderEntities(knifes);
    }
    renderEntity(ninja);
    document.getElementById('healthState').setAttribute('style', 'width:' + ninja.health + '%');
};

function renderEntities(list) {
    for (let i in list) {
        renderEntity(list[i]);
    }
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    if (entity.dir == 'upsideDown') {
        ctx.scale(1, -1);
    } else {
        ctx.scale(1, 1);
    }
    entity.sprite.render(ctx);
    ctx.restore();
}
