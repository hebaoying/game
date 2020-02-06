class GuaAnimation {
    constructor(game, config) {
        this.game = game
        this.config = config
        this.setup()
        this.setupInputs()
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    frames() {
        return this.animations[this.animationName]
    }
    setup() {
        let loader = imgLoader.new(this.game, this.config)
        this.animations = loader.animations
        this.animationNames = loader.animationNames
        // this.animationName = 'zombiewalk'
        this.animationName = this.animationNames[0]
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 3
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipX = false
    }
    setupInputs() {
        var self = this
        var game = this.game
        game.registerAction('a', function(keyStatus){
            self.move(-self.speed, keyStatus)
            // self.moveLeft()
        })
        game.registerAction('d', function(keyStatus){
            self.move(self.speed, keyStatus)
            // self.move()
        })
    }
    draw() {
        var context = this.game.context
        if (this.flipX) {
            context.save()
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)

            context.drawImage(this.texture, this.x, this.y)
            context.restore()
        } else {
            this.game.drawImage(this)
        }
    }
    // debug() {
    //     this.speed = config.player_speed.value
    // }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // log("keyStatus", keyStatus, "this.flipx", this.flipx)
        // var animationNames = {
        //     down: 'mario',
        //     up: 'mario',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}