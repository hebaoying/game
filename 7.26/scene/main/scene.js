var config = {
    player_speed: {
        value: 5,
        range: [1, 100],
    },
    bullet_speed: {
        value: 5,
        range: [1, 100],
    },
    enemy_speed: {
        value: 1,
        range: [1, 5],
    },
    enemy_number: {
        value: 10,
        range: [3, 20],
    },
    cloud_speed: {
        value: 2,
        range: [1, 10],
    },
    fire_cool_down: {
        value: 9,
        range: [5, 30],
    },
}

class Bullet extends GuaImage{
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed.value
    }
    update() {
        this.setup()
        this.y -= this.speed
    }
}

class Play extends GuaImage{
    constructor(game) {
        super(game, 'player')
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.speed = config.player_speed.value
        this.x = 100
        this.y = 400
        this.coolDown = config.fire_cool_down.value
    }
    setupInputs() {
        var self = this
        var game = this.game
        game.registerAction('a', function(){
            self.moveLeft()
        })
        game.registerAction('d', function(){
            self.moveRight()
        })
        game.registerAction('w', function(){
            self.moveUp()
        })
        game.registerAction('s', function(){
            self.moveDown()
        })
        game.registerAction('j', function(){
            self.fire()
        })
    }
    fire() {
        if (this.coolDown == 0) {
            this.coolDown = config.fire_cool_down.value
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    draw() {

    }
    update() {
        this.speed = config.player_speed.value
        if (this.coolDown > 0) {
            this.coolDown--
        }
    }
}

class Cloud extends GuaImage{
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = config.cloud_speed.value
    }
    update() {
        this.setup()
        this.y += this.speed
        if (this.y > 500) {
            this.setup()
        }
    }
}

class Enemy extends GuaImage{
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        var [start, end] = config.enemy_speed.range
        this.speed = randomBetween(start, end)
        this.x = randomBetween(0, 300)
        this.y = randomBetween(0, 100)
    }
    update() {
        this.y += this.speed
        if (this.y > 500) {
            this.setup()
        }
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.enemies = []
        this.setup()
    }
    setup() {
        var game = this.game
        // 初始化
        this.bg = GuaImage.new(game, 'background')
        this.cloud = Cloud.new(game)
        this.player = Play.new(game)

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)

        var es = []
        var enemyNumber = config.enemy_number.value
        for (let i = 0; i < enemyNumber; i++) {
            let e = Enemy.new(game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    // draw() {
    //     this.game.drawImage(this.bg)
    // }
    // update() {
    // }
}

// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.o ffsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
