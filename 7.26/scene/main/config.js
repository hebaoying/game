
var initTemplate = function () {
    let configContainer = e('.config-div')
    let controls = Object.keys(config)
    for (let i = 0; i < controls.length; i++) {
        let name = controls[i]
        let value = config[name].value
        let [min, max] = config[name].range
        let t = `
            <label>
                <input 
                    type="range" 
                    class="gua-auto-slider"
                    id="id_${name}"
                    value="${value}"
                    data-value="config.${name}.value"
                    max="${max}" 
                    min="${min}">
                    ${name}：<span class="gua-label"></span>
            </label>
            <br>
        `
        configContainer.insertAdjacentHTML('beforeend', t)
    }
    displayTags()
}

const displayTags = function () {
    var l = es()
}

const bindInputs = function () {
    bindAll('.gua-auto-slider', 'input', function (event) {
        var input = event.target
        var bindVar = input.dataset.value
        var v = input.value
        eval(bindVar + '=' + v)
        //
        var l = input.closest('label')
        var tag = l.querySelector('.gua-label')
        tag.innerText = v
    })
}

var __main = function () {
    initTemplate()
    bindInputs()
}

__main()