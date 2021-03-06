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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    Login: cc.Node = null;

    @property(cc.Node)
    Signup: cc.Node = null;

    @property(cc.Node)
    OK: cc.Node = null;

    @property(cc.Node)
    Stage1: cc.Node = null;

    @property(cc.Node)
    Stage2: cc.Node = null;

    @property(cc.Node)
    restart: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.Login.on('click',()=>{cc.director.loadScene('login')});
            //cc.director.loadScene('login');
        
        this.Signup.on('click',()=>{cc.director.loadScene('signup')});
        this.OK.on('click',()=>{cc.director.loadScene('login')});

        this.Stage1.on('click',()=>{cc.director.loadScene('Lv1')});

        this.Stage2.on('click',()=>{cc.director.loadScene('Lv2')});

        this.restart.on('click',()=>{cc.director.loadScene('stage_choose')});

    }

    // update (dt) {}
}
