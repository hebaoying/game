class Peashooter extends GuaAnimation{
    constructor(game) {
        let config = {
            peashooter: {
                actions: [
                    {
                        name: 'idle',
                        number: 13,
                    },
                ],
            },
        }
        super(game, config)
        // this.setup()
    }
}