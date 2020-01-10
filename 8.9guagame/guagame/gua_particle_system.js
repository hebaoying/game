class GuaParticle extends GuaImage{
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {

    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.life = config.fire_life.value
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = config.fire_speed_factor.value
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = config.particles_number.value
        this.particles = []
        this.duration = config.fire_duration.value
    }
    update() {
        this.duration--
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            // 设置初始化坐标
            var s = config.fire_speed.value
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新小火花
        for (let p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            return
        }
        for (let p of this.particles) {
            p.draw()
        }
    }
}