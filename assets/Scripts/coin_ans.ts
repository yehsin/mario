// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import gameplay from "./gameplay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class coin extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    @property
    text: string = 'hello';

    private parent_y:number =  null;
    private animation = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    public init(block: cc.Node){
        this.getComponent(cc.Animation).play('coin');
        
        this.anim(block);
        this.parent_y = block.position.y;
    }

    private coin_jump(){
        
        let jump = cc.moveBy(0.5,0,100);
        let down = cc.moveBy(0.5,0,-100);
        let finish = cc.callFunc(()=>{
            this.node.destroy();
        });
        
        this.node.runAction(cc.speed(cc.sequence(jump,down,finish),2));
        //this.Gameplay.getComponent(gameplay).getcoin(1);
    }

    private anim(block:cc.Node){
        
        this.node.parent = block.parent;
        cc.log(this.node.position.x,this.node.position.y);
        this.node.x = block.position.x;
        this.node.y = block.position.y + 50;
        cc.log(this.node.position.x,this.node.position.y);
        cc.log(block.position.x,block.position.y);
        this.coin_jump();
        
    }

    
}
