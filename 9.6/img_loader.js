class imgLoader {
    constructor(game, config=null) {
        this.game = game
        if (config === null) {
            this.config = {
                zombie: {
                    actions: [
                        {
                            name: 'attack',
                            number: 11,
                        },
                        {
                            name: 'walk',
                            number: 15,
                        }
                    ],
                },
            }
        }
        this.animationNames = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    bigName() {
        let names = Object.keys(this.config)
        return names
    }
    numberLength(num) {
        return num.toString().length
    }
    exportImgs() {
        let images = {}
        for (let bigName of this.bigName()) {
            let actions = this.config[bigName].actions
            // log(actions)
            for (let action of actions) {
                let smallName = action.name
                let animationName = bigName + smallName
                this.animationNames.push(animationName)
                let n = action.number
                let 位数 = this.numberLength(n)
                for (let i = 0; i < n; i++) {
                    let num = this.zeroFillNum(i, 位数)
                    let key = bigName + smallName + '' + num
                    let imgName = smallName + '_' + num
                    let value = `img/${bigName}/${smallName}/${imgName}.png`
                    images[key] = value
                }
            }
        }
        // console.log(images)
        return images
    }
    zeroFillNum(num, 位数) {
        return String(num).padStart(位数, '0')
    }
    animations() {
        let result = {}
        for (let bigName of this.bigName()) {
            let actions = this.config[bigName].actions
            for (let action of actions) {
                let smallName = action.name
                let animationName = bigName + smallName
                result[animationName] = []
                let n = action.number
                let 位数 = this.numberLength(n)
                for (let i = 0; i < n; i++) {
                    let num = this.zeroFillNum(i, 位数)
                    let key = bigName + smallName + '' + num
                    let img = this.game.textureByName(key)
                    result[animationName].push(img)
                }
            }
        }
        // console.log('result', result)
        return result

    }
}

// var a = imgLoader.new()
// a.exportImgs()
// a.animations()
