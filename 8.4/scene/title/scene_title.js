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
class Pipes {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.pipes = []
        this.pipe_number = config.pipe_number.value
        this.pipe_horizontal_space = config.pipe_horizontal_space.value
        this.pipe_vertical_gap = config.pipe_vertical_gap.value
        this.backforward_speed = config.backforward_speed.value
        for (let i = 0; i < this.pipe_number; i++) {
            var p1 = GuaImage.new(this.game, 'pipe')
            p1.x = 10 + this.pipe_horizontal_space * i
            p1.flipX = true
            p1.flipY = true
            var p2 = GuaImage.new(this.game, 'pipe')
            p2.x = p1.x
            p2.flipX = false
            p2.flipY = false
            this.resetPipePosition(p1, p2)
            p1.h = 162
            p2.h = 162
            p2.roatation = 180
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    debug() {
        this.pipe_number = config.pipe_number.value
        this.pipe_horizontal_space = config.pipe_horizontal_space.value
        this.pipe_vertical_gap = config.pipe_vertical_gap.value
        // for (var i = 0; i < this.pipes.length / 2 ; i += 2) {
        //     var p1 = this.pipes[i]
        //     var p2 = this.pipes[i + 1]
        //     p1.x -= 5
        //     p2.x -= 5
        //     if(p1.x < this.offset) {
        //         p1.x += this.pipe_number * this.pipe_horizontal_space
        //         // this.resetPipePosition()
        //     }
        //     if(p2.x < this.offset) {
        //         p2.x += this.pipe_number * this.pipe_horizontal_space
        //         this.resetPipePosition(p1, p2)
        //     }
        // }
    }
    resetPipePosition(p1, p2) {
        p1.y = randomBetween(-100, 0)
        p2.y = p1.y + p1.h + this.pipe_vertical_gap

    }
    update() {
        var startX = 0
        var s = this.backforward_speed
        for (var i = 0; i < this.pipes.length / 2 ; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            // let p = this.pipes[i]
            p1.x += this.backforward_speed
            p2.x += this.backforward_speed
            // if (p.x < -this.pipe_horizontal_space) {
            //     // log('水平间隔', p.x, this.pipe_horizontal_space, this.pipe_number)
            //     if (i == 0) {
            //         p.x += this.pipe_horizontal_space * this.pipe_number
            //     } else {
            //         p.x += startX + this.pipe_horizontal_space * i
            //     }
            //     // log('水平间隔 after', p.x, this.pipe_horizontal_space, this.pipe_number)
            // }
                if(p1.x < this.offset) {
                    p1.x += this.pipe_number * this.pipe_horizontal_space
                    // this.resetPipePosition()
                }
                if(p2.x < this.offset) {
                    p2.x += this.pipe_number * this.pipe_horizontal_space
                    this.resetPipePosition(p1, p2)
                }
        }
    }
    draw() {
        var context = this.game.context
        for (let o of this.pipes) {
            context.save()
            var w2 = o.w / 2
            var h2 = o.h / 2
            context.translate(o.x + w2, o.y + h2)
            var scaleX = o.flipX ? -1 : 1
            var scaleY = o.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(o.rotation * Math.PI / 180)

            context.translate(-w2, -h2)

            context.drawImage(o.texture, 0, 0)
            context.restore()
        }
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
        this.offset = config.backforward_speed.value
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

        var pipes = Pipes.new(game)
        this.addElement(pipes)

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
