class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}

class Grounds{
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.number = 30
        this.grounds = []
        this.offset = -3
        this.skipCount = 5
        for (let i = 0; i < this.number; i++) {
            var g = GuaImage.new(this.game, 'ground')
            this.grounds.push(g)
            g.x = i * 7
            g.y = 250
        }
    }
    update() {
        this.skipCount--
        var offset = this.offset
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = offset * 3 * -1
        }
        for (let i = 0; i < this.number; i++) {
            var g = this.grounds[i]
            g.x += offset

        }
    }
    draw() {
        for (let p of this.grounds) {
            p.draw()
        }
    }
}

class Bird extends GuaAnimation{
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        super.setup()
        // 重力和加速度
        this.gy = 10
        this.vy = 0
        this.rotation = 0
    }
    setupInputs() {
        super.setupInputs()
        var game = this.game
        var self = this
        game.registerAction('j', function(){
            // log('jump')
            self.jump()
        })
    }
    update() {
        this.y += this.vy
        this.vy += this.gy * 0.1
        var h = 230
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        super.update()
    }
    jump() {
        this.vy = -5
        this.rotation = -45
    }
    draw() {
        // super.draw();
        var context = this.game.context
        context.save()
        var x = this.x + this.w / 2
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


class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // game.registerAction('k', function(){
        //     var s = Scene.new(game)
        //     game.replaceScene(s)
        // })
        // var text = '按 k 开始游戏'
        // var label = GuaLabel.new(game, text)
        // this.addElement(label)

        // var ps = GuaParticleSystem.new(game)
        // this.addElement(ps)

        var bg = GuaImage.new(game, 'background')
        this.addElement(bg)

        // this.grounds = []
        // for (let i = 0; i < 30; i++) {
        //     var g = GuaImage.new(game, 'ground')
        //     g.x = i * 7
        //     g.y = 260
        //     this.addElement(g)
        //     this.grounds.push(g)
        // }
        var ground = Grounds.new(game)
        this.addElement(ground)

        var b = Bird.new(game)
        b.x = 100
        b.y = 100
        this.addElement(b)

    }
    draw() {
        super.draw()
    }
    update() {
        super.update()

    }
}
