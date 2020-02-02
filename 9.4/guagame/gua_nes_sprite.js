class GuaNesSprite {
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
        this.tileOffset = 32784
        this.data = window.bytesArray.slice(this.tileOffset)

        this.pixelWidth = 1.5
        this.rowsOfSprite = 4
        this.columnsOfSprite = 2
        // 为了省事, 在这里hard code一套动画
        this.animations = {
            mario: [],
        }
        this.speed = config.player_speed.value
        this.w = this.pixelWidth * this.columnsOfSprite * 8
        this.h = this.pixelWidth * this.rowsOfSprite * 8
        this.flipX = false
        // 重力和加速度, y轴
        this.gy = 10
        this.vy = 0
        this.rotation = 0
        //
        this.frameIndex = 0
        this.frameCount = 3
        // 摩擦和加速 , x轴
        this.vx = 0
        this.mx = 0
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
        game.registerAction('j', function(){
            // log('jump')
            self.jump()
        })
    }
    jump() {
        this.vy = -5
        // this.rotation = -45
    }
    draw() {
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
        // draw mario`
        this.drawSprite()
        // context.drawImage(this.texture, 0, 0)
        context.restore()
    }
    debug() {
        this.speed = config.player_speed.value
    }
    update() {
        // 更新受力, x轴
        this.vx += this.mx
        // 说明方向是相反的
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        } else {
            this.x += this.vx
        }
        // 更新受力, y轴
        this.y += this.vy
        this.x + this.vx
        this.vy += this.gy * 0.1
        var h = 100
        if (this.y > h) {
            this.y = h
        }
        // if (enableDebug) {
        //     this.debug()
        // }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex++
            this.frameIndex %= 3
        }

    }
    move(x, keyStatus) {
        this.flipX = x < 0
        let s = 0.5 * x
        if (keyStatus == 'down') {
            this.vx += s
            // 设置摩擦力大小
            this.mx = -s / 2
        }
        // this.x += x

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
    drawBlock(context, pixels, x, y, pixelWidth) {
        let colors = [
            'white',
            '#fe1000',
            '#ffb010',
            '#aa3030',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8; i++) {
            let p1 = pixels[i]
            let p2 = pixels[i + 8]
            for (let j = 0; j < 8; j++) {
                // 8 bits per line
                // 在 j 循环中, 每一次画一个像素点
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = (c2 << 1) + c1
                let color = colors[pixel]
                if (color == 'white') {
                    continue
                }
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }
    drawSprite() {
        let bytesPerBlock = 16
        let tilesPerSprite = 8
        let bytesPerSprite = bytesPerBlock * tilesPerSprite
        let offset = this.frameIndex * bytesPerSprite

        let context = this.game.context

        let pixelSize = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelSize * pixelWidth
        // let offset = 32784
        for (let i = 0; i < this.rowsOfSprite; i++) {
            for (let j = 0; j < this.columnsOfSprite; j++) {
                let x = j * blockSize
                let y = i * blockSize
                let pixels = this.data.slice(offset)
                // let pixels = bytesArray
                // let index = window.offset + (i * 8 + j) * numbrOfBytesPerBlock
                this.drawBlock(context, pixels, x, y, pixelWidth)
                offset += 16
            }
        }
    }
    drawNes () {
        // 78 69
        // 0100 1110      0100 0101
        let context = this.game.context

        let blockSize = 8
        let pixelSize = 8
        let pixelWidth = 10
        let numbrOfBytesPerBlock = 16
        for (let i = 0; i < blockSize; i++) {
            for (let j = 0; j < blockSize; j++) {
                let x = j * pixelSize * pixelWidth
                let y = i * pixelSize * pixelWidth
                let index = window.offset + (i * 8 + j) * numbrOfBytesPerBlock
                this.drawBlock(context, this.data.slice(index), x, y, pixelWidth)
            }
        }
    }
}