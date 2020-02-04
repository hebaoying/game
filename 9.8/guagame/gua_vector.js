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
    sub(vector) {
        let v = vector
        let dx = this.x - v.x
        let dy = this.y - v.y
        return GuaVector.new(dx, dy)
    }
    length() {
        return Math.sqrt(this.x * this.x, this.y * this.y)
    }
    normal() {
        let f = this.length() / 1
        let v = GuaVector.new(this.x / f, this.y / f)
        return v
    }
}