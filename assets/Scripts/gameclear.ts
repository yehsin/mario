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
let This_score = 0;
let hs = 0;
let User = '';

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    MyScore: cc.Label = null;

    @property(cc.Label)
    Highest: cc.Label = null;

    @property(cc.Node)
    replay: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.replay.on('click',()=>{
            cc.director.loadScene('stage_choose');
        });

        firebase.auth().onAuthStateChanged(function(user) {
            let tmp = user.email.split('@');
            User = tmp[0];
            //cc.log(User);
            let ref = firebase.database().ref('User_list').child(User);
            ref.once('value').then(function(snapshot){
                //cc.log(snapshot);
                snapshot.forEach((element) => {
                    cc.log(element.val().score);
                    This_score =  element.val().score;
                });
            })
        });
        cc.log('hi>');
        let ref = firebase.database().ref('user_list');
        ref.child('1').once('value').then(function(snapshot){
            snapshot.forEach((element) => {
                cc.log(element.val());
                cc.log(element.val().score)
                if(element.val().score >hs){
                    hs =  element.val().score;
                }
                
            });
        });
        cc.log('a');
        ref.child('2').once('value').then(function(snapshot){
            snapshot.forEach(element => {
                if(element.val().score > hs){
                    hs =  element.val().score;
                }
                
            });
        });
        
    }

    

    update (dt) {
        this.MyScore.string = This_score + '';
        this.Highest.string = hs + '';
    }
}
