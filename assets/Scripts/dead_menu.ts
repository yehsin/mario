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

let highestscore1 = 0;
let highestscore2 = 0;

let User = '';
let This_score = 0;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    Score1: cc.Label = null;

    @property(cc.Label)
    Score2: cc.Label = null;

    @property(cc.Label)
    MyScore: cc.Label = null;

    @property(cc.Node)
    restart : cc.Node = null;

    //public highestscore1 :number = 0;
    //public highestscore2 :number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.restart.on('click',()=>{
            cc.director.loadScene('stage_choose');
        })

        firebase.auth().onAuthStateChanged(function(user) {
            let tmp = user.email.split('@');
            User = tmp[0];
            let ref = firebase.database().ref('User_list').child(User);
            ref.once('value').then(function(snapshot){
                snapshot.forEach(element => {
                    cc.log(element.val().score);
                    This_score =  element.val().score;
                });
            })
        });
    }

    start () {
        let ref = firebase.database().ref('user_list');
        cc.log('hi');
        
        ref.child('1').once('value').then(function(snapshot){
            //cc.log(snapshot);
            snapshot.forEach(element => {
                //cc.log(element.val().score);
                if(element.val().score > highestscore1){
                    //cc.log(element.val().score);
                    highestscore1 = element.val().score;
                    //cc.log(highestscore1);
                }
            });
        })

        cc.log(highestscore1);
        this.Score1.string = highestscore1 + '';

        ref.child('2').once('value').then(function(snapshot){
            snapshot.forEach(element => {
                //cc.log(element.val().score);
                if(element.val().score > highestscore2){
                    //cc.log(element.val().score);
                    highestscore2 = element.val().score;
                }
            });
        })
//this.Score2.string = this.highestscore2 + '';
    }

    update (dt) {
        this.Score1.string = highestscore1 + '';
        this.Score2.string = highestscore2 + '';
        this.MyScore.string = This_score + '';
    }
}
