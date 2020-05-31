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
import coin from "./coin_ans";
import player_Lv2 from "./player_Lv2";
const {ccclass, property} = cc._decorator;
let User = '';
let datascore = 0;
let remain_life = 3;
@ccclass
export default class gameplay extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(player)
    Player: player = null;

    @property(player_Lv2)
    Player2: player_Lv2 = null;

    @property(cc.Label)
    life: cc.Node = null;

    @property(cc.Label)
    time: cc.Node = null;

    @property(cc.Label)
    coins: cc.Node = null;

    @property(cc.Label)
    Score: cc.Node = null;

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    private pause = false;
    private playerLife: number = 3;
    private timer: number =250;
    private coins_count :number = 0;
    public score :number = 0;
    private tmpScore:number = 0;
    public stage:number = 1;
    User_play = 'Steve';
    tmp = []
    private over:boolean = false;

    onLoad(){
        if(this.Player!=null) this.stage = 1;
        else if(this.Player2!=null) this.stage = 2;
        firebase.auth().onAuthStateChanged(function(user){
            let tmp = user.email.split('@');
            User = tmp[0];
            let ref = firebase.database().ref('life').child(User);
            ref.once('value').then(function(data){
                cc.log(data.val().life);
                remain_life = data.val().life;
                firebase.database().ref('tmp').set({
                    'tmp' : remain_life
                })
            });
            
            //this.playerLife = remain_life;
        });
        cc.log('???');
        firebase.database().ref('tmp').once('value').then((data)=>{
            remain_life = data.val().tmp;
            
        });
        cc.log(remain_life);


    }

    gamestart(){
        cc.audioEngine.playMusic(this.bgm, true);
        
        

        this.playerLife = remain_life;
        
        //cc.log(this.User_play);
    }

    game_clear(n){
        remain_life = this.playerLife;
        firebase.database().ref('user_list').child(n).push({
            'score': this.score
        });

        firebase.auth().onAuthStateChanged(function(user){
            let tmp = user.email.split('@');

            cc.log(user.email.split('@'));
            User = tmp[0];
            firebase.database().ref('User_list').child(User).push({
                'score': datascore
            });
            firebase.database().ref('life').child(User).set({
                'life': remain_life
            })
            
        });
        cc.log('success');
        cc.game.pause();
        
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
        this.time_count();
    }

    countLife(number){
        this.playerLife += number;
    }

    updateScore(n){
        this.tmpScore += n;
    }

    countScore(){
        this.score = this.coins_count *10 + this.tmpScore;
        
    }

    private time_count(){
        this.schedule(()=>{
            this.timer--;
            this.time.getComponent(cc.Label).string = this.timer + '';
        },1,251,0);
        
    }

    public getcoin(n){
        this.coins_count += n;
    }

    update(dt){
        datascore = this.score;
        if(this.playerLife == 0 && !this.over){
            this.over = true;
            remain_life = 3;

            let ref = firebase.database().ref('user_list').child(this.stage);
            ref.push({
                'score' : this.score
            });
            firebase.auth().onAuthStateChanged(function(user){
                let tmp = user.email.split('@');
    
                cc.log(user.email.split('@'));
                User = tmp[0];
                
                firebase.database().ref('life').child(User).set({
                    'life': remain_life
                })
                
            });
            cc.director.loadScene('dead_menu');
        }
        this.countScore();

        this.coins.getComponent(cc.Label).string = this.coins_count + '';
        this.life.getComponent(cc.Label).string = this.playerLife + '';
        this.Score.getComponent(cc.Label).string = this.score + '';
    }



    // update (dt) {}
}
