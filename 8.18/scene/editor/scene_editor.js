class GuaEditor {
    constructor(game) {
        this.game = game
        this.setup()
        // this.setupInputs()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.tiles = [
            // 1, 2,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,0,0,1,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,3,0,0,0,2,0,0,0,1,1,0,0,0,0,0,3,0,0,0,0,0,0,0,1,1,0,0,0,0,0,3,0,0,0,0,0,0,1,1,1,0,0,0,0,0,3,0,0,0,0,3,3,1,1,0,0,0,4,0,0,3,0,0,0,3,3,0,1,1,0,0,0,4,0,0,0,0,0,3,3,0,0,1,1,0,0,0,4,0,0,0,0,0,3,3,0,0,1,1,1,0,0,4,0,0,0,0,0,0,3,3,3,1,1,1,0,0,4,0,0,0,0,0,0,0,0,0,1,1,0,0,0,4,0,0,0,0,0,0,0,0,0,1,1,1
        ]
        this.tiles = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,3,0,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,0,0,0,0,3,3,3,3,3,0,0,0,0,0,3,3,0,0,0,3,0,3,0,3,3,3,0,0,0,0,3,0,0,3,0,3,0,0,0,0,3,0,0,0,0,3,0,3,3,0,3,0,0,3,3,3,0,0,0,3,3,3,3,0,0,3,3,0,0,3,0,0,0,0,3,0,3,0,0,0,0,3,3,0,0,0,0,3,3,0,0,3,0,0,0,0,0,3,3,3,3,3,3,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0]



        this.th = 15
        this.tw = this.tiles.length / this.th
        // todo tw 整数
        log('tiles length', this.tiles.length, this.th, this.tw)
        this.tileImage = [
            GuaImage.new(this.game, 't1'),
            GuaImage.new(this.game, 't2'),
            GuaImage.new(this.game, 't3'),
            GuaImage.new(this.game, 't4'),
        ]
        this.tileSize = 32
    }
    draw() {
        let h = this.th
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                // log('draw tile', index)
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let img = this.tileImage[index - 1]
                this.game.context.drawImage(img.texture, x, y)
            }
        }
    }
    update() {

    }
}
class SceneTile extends GuaScene {
    constructor(game) {
        super(game)

        // let tiles = GuaTiles.new(game)
        // this.addElement(tiles)

        var mario = GuaNesSprite.new(game)
        mario.x = 100
        mario.y = 100
        this.addElement(mario)
    }
    draw() {
        super.draw()
    }
    update() {
        super.update()

    }
}
