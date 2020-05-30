// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import player from "./player";
import coin from "./coin_ans";
const {ccclass, property} = cc._decorator;

@ccclass
export default class gameplay extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(player)
    Player: player = null;

    @property(cc.Label)
    life: cc.Node = null;

    @property(cc.Label)
    time: cc.Node = null;

    @property(cc.Label)
    coins: cc.Node = null;

    @property(cc.Label)
    Score: cc.Node = null;

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    private pause = false;
    private playerLife: number = 3;
    private timer: number =250;
    private coins_count :number = 0;
    private score :number = 0;
    private tmpScore:number = 0;

    


    gamestart(){
        cc.audioEngine.playMusic(this.bgm, true);
    }

    gamepause(){
        if(this.pause){
            this.scheduleOnce(()=>{
                cc.game.pause();
            }, 0.1);
        }
        else cc.game.resume();
    }


    gameover(){
        cc.audioEngine.stopMusic();
    }

    gameEnd(){
        cc.game.end();
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.gamestart();
        this.time_count();
    }

    countLife(number){
        this.playerLife += number;
    }

    updateScore(n){
        this.tmpScore += n;
    }

    countScore(){
        this.score = this.coins_count *10 + this.tmpScore;
        
    }

    private time_count(){
        this.schedule(()=>{
            this.timer--;
            this.time.getComponent(cc.Label).string = this.timer + '';
        },1,251,0);
        
    }

    public getcoin(n){
        this.coins_count += n;
    }

    update(dt){
        if(this.playerLife == 0){
            //this.gameover();
            this.gameEnd();
        }
        this.countScore();

        this.coins.getComponent(cc.Label).string = this.coins_count + '';
        this.life.getComponent(cc.Label).string = this.playerLife + '';
        this.Score.getComponent(cc.Label).string = this.score + '';
    }



    // update (dt) {}
}
