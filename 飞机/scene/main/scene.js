class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup(){
        this.setupBG()
        this.setupCloud()
        this.setupPlayer()
        this.setupEnemies()
        this.setupScore()
    }
    setupScore(){
        this.score = GuaLabel.new(this.game, '分数:')
        this.score.x = 200
        this.score.y = 400
        this.score.game.context.fillStyle = 'orange'
        this.score.game.context.font = '30px serif'
        this.addElement(this.score)
    }
    setupBG(){
        this.bg = GuaImage.new(this.game,'sky')
        this.addElement(this.bg)
    }
    setupCloud(){
        this.cloud = Cloud.new(this.game,'cloud')
        this.addElement(this.cloud)
    }
    setupPlayer(){
        this.player =Player.new(this.game)
        this.player.x = config.player_position['x']
        this.player.y = config.player_position['y']
        // 为了方便调用，这个把player改成了全局变量
        window.player = this.player 
        this.addElement(this.player)
    }
    setupEnemies(){
        this.numberOfEnemies = 5
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    update(){
        // log('scence element is ',this.elements)
        super.update()
        // 自动发射子弹
        // this.player.fire()
        this.cloud.y += 1
        this.score.text = '生命值:' + window.player.hp

    }
    setupInputs(){
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('f', function(){
            s.player.fire()
            log('this element is',this.elements)
        })
    }
}