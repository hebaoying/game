class imgLoader {
    constructor(game=null, config=null) {
        this.game = game
        this.config = config
        // if (config === null) {
        //     this.config = {
        //         zombie: {
        //             actions: [
        //                 {
        //                     name: 'attack',
        //                     number: 11,
        //                 },
        //                 {
        //                     name: 'walk',
        //                     number: 15,
        //                 }
        //             ],
        //         },
        //         peashooter: {
        //             actions: [
        //                 {
        //                     name: 'idle',
        //                     number: 13,
        //                 }
        //             ],
        //         }
        //     }
        // }
        this.bigNames = Object.keys(this.config)
        this.setup()
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    numberLength(num) {
        return num.toString().length
    }
    zeroFillNum(num, 位数) {
        return String(num).padStart(位数, '0')
    }
    setup() {
        this.animations = []
        this.animationNames = []
        // zombieattack0: 'img/zombie/attack/attack_00.png'
        this.images = {}
        this.process()
    }
    process() {
        for (let bigName of this.bigNames) {
            let bigNameValue = this.config[bigName]
            let actions = bigNameValue.actions
            if (actions === undefined) {
                this.images[bigName] = bigNameValue
                continue
            }
            // log(actions)
            for (let action of actions) {
                let smallName = action.name
                let animationName = bigName + smallName
                //
                this.animationNames.push(animationName)
                //
                this.animations[animationName] = []
                let n = action.number
                let 位数 = this.numberLength(n)
                let imgType = action.type ? action.type : 'png'
                for (let i = 0; i < n; i++) {
                    let num = this.zeroFillNum(i, 位数)
                    let key = bigName + smallName + num
                    let imgName = smallName + '_' + num
                    let value = `img/${bigName}/${smallName}/${imgName}.${imgType}`
                    //
                    this.images[key] = value
                    //
                    if (this.game != null) {
                        let img = this.game.textureByName(key)
                        this.animations[animationName].push(img)
                    }
                }
            }
        }
    }
    // animationNames() {
    //     let arr = []
    //     for (let bigName of this.bigNames) {
    //         let actions = this.config[bigName].actions
    //         // log(actions)
    //         for (let action of actions) {
    //             let smallName = action.name
    //             let animationName = bigName + smallName
    //             arr.push(animationName)
    //             // this.animationNames.push(animationName)
    //         }
    //     }
    //     return arr
    // }
    // exportImgs() {
    //     let images = {}
    //     for (let bigName of this.bigNames) {
    //         let actions = this.config[bigName].actions
    //         // log(actions)
    //         for (let action of actions) {
    //             let smallName = action.name
    //             let n = action.number
    //             let 位数 = this.numberLength(n)
    //             for (let i = 0; i < n; i++) {
    //                 let num = this.zeroFillNum(i, 位数)
    //                 let key = bigName + smallName + '' + num
    //                 let imgName = smallName + '_' + num
    //                 let value = `img/${bigName}/${smallName}/${imgName}.png`
    //                 images[key] = value
    //             }
    //         }
    //     }
    //     // console.log(images)
    //     return images
    // }
    // animations() {
    //     let result = {}
    //     for (let bigName of this.bigNames) {
    //         let actions = this.config[bigName].actions
    //         for (let action of actions) {
    //             let smallName = action.name
    //             let animationName = bigName + smallName
    //             result[animationName] = []
    //             let n = action.number
    //             let 位数 = this.numberLength(n)
    //             for (let i = 0; i < n; i++) {
    //                 let num = this.zeroFillNum(i, 位数)
    //                 let key = bigName + smallName + '' + num
    //                 let img = this.game.textureByName(key)
    //                 result[animationName].push(img)
    //             }
    //         }
    //     }
    //     // console.log('result', result)
    //     return result
    //
    // }
}

// var a = imgLoader.new()
// a.exportImgs()
// a.animations()
