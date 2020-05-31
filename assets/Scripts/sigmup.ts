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
let txtmail = '';
let txtpassword = '';
@ccclass
export default class signup extends cc.Component {

    @property(cc.Node)
    Email : cc.Node = null;

    @property(cc.Node)
    Password : cc.Node = null;

    @property(cc.Node)
    OK: cc.Node = null;

    //public txtmail:string = null;
    //public txtpassword:string = null;

    public OK_enter = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.OK.on('click',()=>{
            this.Sign_up();
        });
    }
    write_data(){
        txtmail = this.Email.getComponent(cc.EditBox).string;
        txtpassword = this.Password.getComponent(cc.EditBox).string;
    }

    Sign_up(){
        firebase.auth().createUserWithEmailAndPassword(txtmail, txtpassword)
            .then((result) => {
                var txt = txtmail.split("@");
                /*firebase.database().ref('user_list').child(txt[0]).set({
                    'user_password': this.txtpassword
                })*/
                cc.log("success", result.message);
                cc.director.loadScene('stage_choose');
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorMessage = error.message;
                cc.log("error", errorMessage);
                //this.Email.getComponent(cc.EditBox).string = '';
                //this.Password.getComponent(cc.EditBox).string = '';
            });
    }

    update(dt){
        txtmail = this.Email.getComponent(cc.EditBox).string;
        txtpassword = this.Password.getComponent(cc.EditBox).string;
    }
    

    
}
