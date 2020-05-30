// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import gameplay from './gameplay'
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMan extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    private CoinPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private EatPrefab : cc.Prefab = null;

    @property(cc.Node)
    Gameplay: gameplay= null;

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    private anim = null;
    private animState = null;
    private got_coin = false;
    private got_eat = false;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.anim = this.getComponent(cc.Animation);
    }

    start () {
        //cc.audioEngine.playMusic(this.bgm, true);
        this.anim.play('ques');
    }

    //update (dt) {}

    onBeginContact(contact,self,other){
        if(self.node.name == "ques_block" && other.node.name == 'player' ){
            if(!this.got_coin && contact.getWorldManifold().normal.y <0){
                this.got_coin = true;
                this.anim.play('trigger',1)
                let coin = cc.instantiate(this.CoinPrefab);
                coin.getComponent('coin_ans').init(this.node);
                this.Gameplay.getComponent(gameplay).getcoin(1);
                //cc.game.pause();
                
            }
            
            
           
            //cc.log('conflict');
        }
        else if(self.node.name == 'eat_trigger' && other.node.name == 'player' /*&& other.node.y <= this.node.y*/){
            //cc.log('trigger');
            if(!this.got_eat && contact.getWorldManifold().normal.y <0){
                this.anim.play('trigger',1);
                let eat = cc.instantiate(this.EatPrefab);
                eat.getComponent('eat_ans').init(this.node);
                this.got_eat = true;
                //cc.game.pause();
                
            }
            

        }
    }
}
