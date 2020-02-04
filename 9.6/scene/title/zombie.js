class Zombie extends GuaAnimation{
    constructor(game) {
        let config = {
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
        super(game, config)
        this.setup()
    }
    setup() {
        super.setup();
    }
}