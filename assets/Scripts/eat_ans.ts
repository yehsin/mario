// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class eat extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private init(block : cc.Node){
        cc.log('init');
        this.anim(block);
    }

    private anim(block:cc.Node){
        cc.log('anim');
        this.node.parent = block.parent;
        this.node.x = block.position.x;
        this.node.y = block.position.y;
        cc.log('anim_pos');
        let up = cc.moveBy(1,0,25);
        this.node.runAction(up);
        cc.log('runaction');
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(120,0);
        
    }
    onBeginContact(contact,self,other){
        if(other.node.name == 'player'){
            this.node.destroy();
        }
    }
    // update (dt) {}
}
