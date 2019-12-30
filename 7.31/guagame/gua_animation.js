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
    setup() {
        // 为了省事, 在这里hard code一套动画
        // this.animations = {
        //     walk: [],
        //     bird: [],
        //     idle: [],
        //     run: [],
        // }
        this.speed = config.player_speed.value
        this.frames = []
        // 这里的下标错了, debug 很久
        for (let i = 1; i < 6; i++) {
            let t = arguments[i]
            let name = 'run' + (i + 1)
            let img = this.game.textureByName(name)
            this.frames.push(img)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 3
        this.w = this.texture.width
        this.h = this.texture.height
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
    draw() {
        this.game.drawImage(this)
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
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
    move(x, keyStatus) {
        this.x += x
        this.flipx = x < 0
        // log("keyStatus", keyStatus, "this.flipx", this.flipx)

        var animationNames = {
            down: 'bird',
            up: 'bird',
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