const {ccclass, property} = cc._decorator;

@ccclass
export default class map extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    
    protected istouched : boolean = false;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }
    start () {

    }

    // update (dt) {}
    update(dt){

    }

    reset(){
        
    }
}
