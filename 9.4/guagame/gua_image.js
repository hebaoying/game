class GuaImage {
    constructor(game, name) {
        this.game = game
        this.name = name
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipX = false
        this.flipY = false
        this.rotation = 0
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
    updateRotation(target) {
        let t = target
        if (t != null) {
            let v = t.center().sub(this.center()).normal()
            let r = 向量夹角(v.x, -v.y)
            this.rotation = r
        }
    }
    inside(x, y) {
        let inX = x >= this.x && x <= this.x + this.w
        let inY = y >= this.y && y <= this.y + this.h
        let result = inX && inY
        return result
    }
    clone() {
        let c = GuaImage.new(this.game, this.name)
        c.x = this.x
        c.y = this.y
        return c
    }
    center() {
        let x = this.x + this.w / 2
        let y = this.y + this.h / 2
        return GuaVector.new(x, y)
    }
    // distance(vector) {
    //     log('vector', vector)
    //     let v = vector
    //     let dx = v.x - this.x
    //     let dy = v.y - this.y
    //     return Math.sqrt(dx * dx + dy * dy)
    // }
}
