class Zombie extends GuaAnimation{
    constructor(game) {
        let config = {
            zombie: {
                actions: [
                    {
                        name: 'walk',
                        number: 15,
                    },
                    {
                        name: 'attack',
                        number: 11,
                    },
                ],
            },
        }
        super(game, config)
        this.setup()
    }
    setup() {
        super.setup();
    }
}