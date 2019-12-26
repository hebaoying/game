
var initTemplate = function () {
    let configContainer = e('.config-div')
    let controls = Object.keys(config)
    for (let i = 0; i < controls.length; i++) {
        let name = controls[i]
        let value = config[name].value
        let [min, max] = config[name].range
        let t = `
            <lable>${name}：
                <input type="range" id="id_${name}" value="${value}" max="${max}" min="${min}">
            </lable>
            <br>
        `
        configContainer.insertAdjacentHTML('beforeend', t)
    }
}

var __main = function () {
    initTemplate()
}

__main()