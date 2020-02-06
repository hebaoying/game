var config = {
    bulletZombieOffset: {
        name: '子弹和僵尸死亡距离',
        enable: true,
        value: -30,
        range: [-50, 100],
    },
    bulletSpeed: {
        name: '子弹速度',
        enable: true,
        value: 3,
        range: [1, 100],
    },
    bulletCooldown: {
        name: '子弹冷却时间',
        enable: true,
        value: 25,
        range: [5, 100],
    },
}
var initTemplate = function () {
    let configConntainer = e('.config-div')
    let controls = Object.keys(config)
    for (let i = 0; i < controls.length; i++) {
        let n = controls[i]
        if (!config[n].enable) {
            continue
        }
        let name = config[n].name
        let value = config[n].value
        let [min, max] = config[n].range
        let t = `
            <label>
                <input 
                    type="range" 
                    class="gua-auto-slider"
                    id="id_${n}"
                    value="${value}"
                    data-value="config.${n}.value"
                    max="${max}" 
                    min="${min}">
                    ${name}：<span class="gua-label"></span>
            </label>
            <br>
        `
        configConntainer.insertAdjacentHTML('beforeend', t)
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