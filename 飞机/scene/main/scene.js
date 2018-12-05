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
        // 护盾效果
        this.nut = Nut.new(this.game)
        this.addElement(this.nut)
        
        // for (var i = 0; i < 30; i++) {
        //   var g = GuaImage.new(this.game,'ground')
        //   g.x = i * 19
        //   g.y = 450
        //   this.addElement(g)
        //   this.grounds.push(g)
        // }
    }
    setupScore(){
        this.hpNum = GuaLabel.new(this.game, '生命值')
        this.score = GuaLabel.new(this.game, '分数:')
        this.hpNum.x = 0
        this.hpNum.y = 590
        this.score.x = 300
        this.score.y = 590
        this.hpNum.game.context.fillStyle = 'orange'
        this.hpNum.game.context.font = '30px serif'
        this.addElement(this.hpNum)
        this.score.game.context.fillStyle = 'orange'
        this.score.game.context.font = '30px serif'
        this.addElement(this.hpNum)
        this.addElement(this.score)
    }
    setupBG(){
        this.BGs = []
        for (var i = 0; i < 3; i++) {
            var bg = GuaImage.new(this.game,'sky')
            bg.y = - i * bg.h
            this.addElement(bg)
            this.BGs.push(bg)
        }
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
        // this.bg.y += 1
        this.hpNum.text = '生命值:' + window.player.hp
        this.score.text = '分数:' + window.player.score
        for (var i = 0; i < 3; i++) {
            var g = this.BGs[i]
            if (g.y >= g.h) {
                g.y -= g.h * 3 - 20
            }
            else{
                g.y += 20
            }
          }

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