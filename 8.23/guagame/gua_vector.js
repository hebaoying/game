class GuaVector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    distance(vector) {
        let v = vector
        let dx = v.x - this.x
        let dy = v.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}