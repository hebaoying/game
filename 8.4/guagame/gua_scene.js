class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugModeEnabled = true
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        // for (let i = 0; i < this.elements.length; i++) {
        //     let e = this.elements[i]
        //     this.game.drawImage(e)
        // }
        for (const e of this.elements) {
            e.draw()
        }
    }
    update() {
        if (this.debugModeEnabled) {
            for (const e of this.elements) {
                e.debug && e.debug()
            }
        }
        for (const e of this.elements) {
            e.update()
        }
    }
}
