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
const {ccclass, property} = cc._decorator;

@ccclass
export default class gameplay extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(player)
    Player: player = null;

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    private pause = false;
    private playerLife: number = 3;


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
    }

    // update (dt) {}
}
