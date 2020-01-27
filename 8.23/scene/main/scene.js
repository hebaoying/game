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


class Tower extends GuaImage{
    constructor(game, name) {
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup() {
        this.attack = 1
        this.range = 100
        this.target = null
    }
    update() {
        // if (this.target !== null) {
        if (this.canAttack(this.target)) {
            log('攻击敌人')
            this.fire(this.target)
            if (!this.target.alive) {
                this.clearTarget()
            }
        }
    }
    canAttack(enemy) {
        let e = enemy
        let enemyExist = e !== null
        if (enemyExist) {
            let c = this.center()
            let ec = enemy.center()
            let distance = c.distance(ec)
            // log('can attach******', distance < this.range, distance, this.range)
            return distance < this.range
        }

    }
    findTarget(enemies) {
        for (let e of enemies) {
            // log('find target*******', this.canAttack(e))
            if (this.canAttack(e)) {
                this.target = e
                break
            } else {
                this.clearTarget()
            }
        }
    }
    clearTarget() {
        this.target = null
    }
    fire(target) {
        target.hurt(this.attack)
    }
}

class Enemy extends GuaImage{
    constructor(game, name) {
        name = name || 'e1'
        super(game, name)
        this.setup()
    }
    setup() {
        this.hp = 3
        this.alive = true
        this.x = 0
        this.speed = 1
        this.destination = 500
    }
    update() {
        this.x += this.speed
        if (this.x > this.destination) {
            log('敌人已经到达')
        }
    }
    die() {
        this.alive = false
        this.scene.removeElement(this)
    }
    hurt(ap) {
        this.hp -= ap
        if (this.hp <= 0) {
            this.die()
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

        var ps = GuaParticleSystem.new(game)
        this.addElement(ps)
    }
    // draw() {
    //     this.game.drawImage(this.bg)
    // }
    // update() {
    // }
}
