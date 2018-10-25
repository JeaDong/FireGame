class Cloud extends GuaImage{
    constructor(game) {
        super(game,'cloud')
        this.setup()

    }
    setup(){
        this.speed = 1
        this.x = randomBetween(0,350)
        this.y = -randomBetween(0,200)
    }
    resetPosition(){
        this.y += config.cloud_speed
        if (this.y > 600) {
            this.setup()
        }

    }
    update(){
        this.resetPosition()
    }
}