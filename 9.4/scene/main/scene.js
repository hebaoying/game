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
        this.coolDown = 0
        this.rotation = 0
    }
    update() {
        if (this.canAttack(this.target)) {
            // log('攻击敌人', this.target)
            this.fire(this.target)
        }
        this.updateRotation(this.target)
    }
    canAttack(enemy) {
        let e = enemy
        let enemyExist = e !== null
        if (!enemyExist) {
            return
        }
        if (this.coolDown > 0) {
            this.coolDown--
        } else {
            this.coolDown = this.fireCoolDown
            //
            let c = this.center()
            let ec = enemy.center()
            let distance = c.distance(ec)
            let inAttackRange = distance < this.range
            return inAttackRange
        }
    }
    findTarget(enemies) {
        for (let e of enemies) {
            // log('find target*******', this.canAttack(e))
            if (this.canAttack(e)) {
                this.target = e
                break
            } else {
                this.resetTarget()
            }
        }
    }
    resetTarget() {
        // this.rotation = 0
        this.target = null
    }
    fire(target) {
        target.hurt(this.attack)
        if (!target.alive) {
            this.resetTarget()
        }
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
    drawImg() {
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
    draw() {
        this.drawAttackRange()
        this.drawImg()
    }
}

class Enemy extends GuaImage{
    constructor(game, name) {
        name = name || 'e1'
        super(game, name)
        this.tileSize = 0
        this.setup()
    }
    setup() {
        this.maxHp = 5
        this.hp = this.maxHp
        this.alive = true
        this.x = 0
        this.speed = 1
        // this.destination = 500
        //
        this.stepIndex = 0
        this.steps = [
        ]
    }
    resetPath(path) {
        let steps = []
        let s = this.towerSize
        log('t size', s)
        for (let p of path) {
            let c = [p.x * s, p.y * s]
            steps.push(c)
        }
        this.steps = steps
        // log('steps:', steps)
        this.stepIndex = 0
    }
    sign(dv, v) {
        let result
        if (dv === v) {
            result = 0
        } else if (dv > v) {
            result = 1
        } else if (dv < v) {
            result = -1
        }
        return result
    }
    update() {
        this.x += this.speed
        if (this.steps.length === 0) {
            return
        }
        let [dx, dy] = this.steps[this.stepIndex]
        let signX = this.sign(dx, this.x)
        let signY = this.sign(dy, this.y)
        this.x += this.speed * signX
        this.y += this.speed * signY
        if (this.x === dx && this.y === dy) {
            log('敌人已经到达 目标点')
            this.stepIndex++
            // if destination
            if (this.stepIndex === this.steps.length) {
                log('敌人到达终点')
                this.die()
            }
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