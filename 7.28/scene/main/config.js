var config = {
    player_speed: {
        name: '玩家速度',
        enable: true,
        value: 5,
        range: [1, 100],
    },
    bullet_speed: {
        name: '子弹速度',
        enable: true,
        value: 5,
        range: [1, 100],
    },
    enemy_speed: {
        name: '敌机速度',
        enable: true,
        value: 1,
        range: [1, 5],
    },
    enemy_number: {
        name: '敌人数量',
        enable: false,
        value: 10,
        range: [3, 20],
    },
    cloud_speed: {
        name: '云朵速度',
        enable: true,
        value: 2,
        range: [1, 10],
    },
    fire_cool_down: {
        name: '子弹冷却时间',
        enable: true,
        value: 9,
        range: [5, 30],
    },
    fire_speed_factor: {
        name: '爆炸加速度',
        enable: false,
        value: 0.01,
    },
    fire_speed: {
        name: '爆炸速度',
        enable: true,
        value: 2,
        range: [1, 30],
    },
    particles_number: {
        name: '火花数量',
        enable: false,
        value: 60,
    },
    fire_duration: {
        name: '爆炸停留时间',
        enable: false,
        value: 20,
    },
    fire_life: {
        name: '爆炸范围',
        enable: false,
        value: 10,
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