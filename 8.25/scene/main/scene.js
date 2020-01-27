class Tower extends GuaImage{
    constructor(game, name) {
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup() {
        this.attack = 1
        this.range = 80
        this.target = null
        this.fireCoolDown = 3
        this.coolDown = this.fireCoolDown
        this.rotation = 0
    }
    update() {
        // if (this.target !== null) {
        if (this.canAttack(this.target)) {
            log('攻击敌人', this.target)
            this.fire(this.target)
            if (!this.target.alive) {
                this.clearTarget()
            }
        }
        this.updateCoolDown()
        this.updateRotation()
    }
    updateCoolDown() {
        if (this.coolDown > 0) {
            this.coolDown--
        }
    }
    updateRotation() {
        let t = this.target
        if (t != null) {
            let v = t.center().sub(this.center()).normal()
            let r = 向量夹角(v.x, v.y)
            this.rotation = r
        }
    }
    canAttack(enemy) {
        if (this.coolDown === 0) {
           this.coolDown = this.fireCoolDown
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
        this.rotation = 0
        this.target = null
    }
    fire(target) {
        target.hurt(this.attack)
    }
    drawAttackRange() {
        let context = this.game.context
        context.beginPath()
        let v = this.center()
        context.arc(v.x, v.y, this.range, 0, 2 * Math.PI)
        // 这个是画笔划
        // context.stroke()
        // 这是画圆形的
        context.fillStyle = 'rgba(200, 200, 200, 0.5'
        context.fill()
    }
    draw() {
        this.drawAttackRange()
        // super.draw();
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)

        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()
    }
}

class Enemy extends GuaImage{
    constructor(game, name) {
        name = name || 'e1'
        super(game, name)
        this.setup()
    }
    setup() {
        this.maxHp = 5
        this.hp = this.maxHp
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
    drawLifeBar() {
        let context = this.game.context
        context.fillStyle = 'red'
        let [x, y, w, h] = [this.x, this.y - 10, this.w, 10]
        // total bar
        context.fillRect(x, y, w, h)
        // left life bar
        context.fillStyle = 'green'
        let w1 = w * (this.hp / this.maxHp)
        context.fillRect(x, y, w1, h)
    }
    draw() {
        super.draw()
        this.drawLifeBar()
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
}
