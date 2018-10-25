class GuaParticle extends GuaImage {
    constructor(game) {
        super(game,'fire')
        this.setup()
    }
    setup(){
        this.life = 5
    }
    update(){
        this.life--
        this.x += this.vx
        this.y += this.vy
        this.factor = 0.7
        this.vx += this.factor * this.vx
        this.vy += this.factor * this.vy
    }
    init(x, y, vx, vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
}
class GuaParticleSystem {
    constructor(game,object) {
        this.game = game
        this.object = object
        this.setup()
    }
    static new(game,object) {
        var i = new this(game,object)
        return i
    }
    draw() {
        if (this.duration < 0) {
            //TODO,这是一个临时的方案
            //应该从scene中删除自己才对
            return
        }
        for (var p of this.particles){
            p.draw()
        }
    }
    update() {
        //删除小火花
        this.duration--

        //添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            //初始化坐标
            var s = 5
            var vx = randomBetween(-s,s)
            var vy = randomBetween(-s,s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        //更新所有的小火花
        for (var p of this.particles){
            p.update()
        }
        //删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    setup(){
        var e = this.object
        this.duration = 50
        this.x = e.x + e.w/2
        this.y = e.y + e.h/2
        this.numberOfParticles = 5
        this.particles = []
    }
}