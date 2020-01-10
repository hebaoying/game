const e = sel => document.querySelector(sel)

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    return elements
}
const log = console.log.bind(console)

const imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

const rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}
var bindEvent = function (element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindAll = function (selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, function (event) {
            callback(event)
        })
    }
}

const __ajax = function (request) {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}
const randomBetween = function(start, end) {
    var n = Math.random()
    var r = end - start
    n = n * r
    n = n + start
    n = Math.floor(n)
    return n
}