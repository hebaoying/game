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
    // draw() {
    //
    // }
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
