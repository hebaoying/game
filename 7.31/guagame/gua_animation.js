class GuaAnimation {
    constructor(game) {
        this.game = game
        this.setup()
        this.setupInputs()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    frames() {
        return this.animations[this.animationName]
    }
    setup() {
        // 为了省事, 在这里hard code一套动画
        this.animations = {
            walk: [],
            bird: [],
            idle: [],
            run: [],
        }
        this.speed = config.player_speed.value
        // 这里的下标错了, debug 很久
        for (let i = 1; i < 7; i++) {
            let name = 'run' + i
            let img = this.game.textureByName(name)
            this.animations.run.push(img)
        }
        for (let i = 1; i < 10; i++) {
            let name = 'idle' + i
            // log('name:', name)
            let img = this.game.textureByName(name)
            this.animations.idle.push(img)
        }
        this.animationName = 'idle'
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
        // game.registerAction('w', function(){
        //     self.moveUp()
        // })
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
        var animationNames = {
            down: 'run',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
        // if (keyStatus == 'down') {
        // } else if(keyStatus == 'up') {
        //     this.changeAnimation('idle')
        // }
    }
    changeAnimation(name) {
        this.animationName = name
    }
}