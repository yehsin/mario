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
export default class login extends cc.Component {
    @property(cc.Node)
    Email : cc.Node = null;

    @property(cc.Node)
    Password : cc.Node = null;

    @property(cc.Node)
    OK: cc.Node = null;

    //public txtmail:string = null;
    //public txtpassword:string = null;

    onLoad(){
        this.OK.on('click',()=>{
            
            this.write_data();
            
        });
    }

    write_data(){
        if(this.Email.getComponent(cc.EditBox).string != ''){
            firebase.auth().signInWithEmailAndPassword(txtmail,txtpassword)
            .then(() => {
                cc.log(txtmail, txtpassword);
                cc.director.loadScene('stage_choose');
            }).catch(function(error){
                cc.log(error);
            });
        }
        
    }

    update(dt){
        txtmail = this.Email.getComponent(cc.EditBox).string;
        txtpassword = this.Password.getComponent(cc.EditBox).string;
        cc.log(txtmail,txtpassword);
        
    }
    

    
}
