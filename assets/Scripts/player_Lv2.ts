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
export default class player_Lv2 extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    maincamera: cc.Node = null;
    
    @property(cc.Node)
    Gameplay: cc.Node= null;

    @property({type:cc.AudioClip})
    jumpSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    dieSound: cc.AudioClip = null;

    private playerSpeed: number = 0;
    private anim = null;
    private animState = null;
    private aDown:boolean = false;
    private dDown:boolean = false;
    private SpaceDown:boolean = false;
    private issmall = true;
    private isbig = false;
    private iswater:boolean = false;
    private enter_tube = false;
    private enter = false;
    //private idgameover = false;
    
    private isDead:boolean = false;
    private onGround: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.animState = this.anim.play('right_walk');
        cc.director.getPhysicsManager().enabled = true;  
        cc.director.getPhysicsManager().gravity = cc.v2 (0,-200);     	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyUp(event){
        if(event.keyCode == cc.macro.KEY.a){
            this.anim.stop();
            this.aDown = false;
            
            if(this.issmall){
                this.small_stand();
                this.smallwalk_ani();
            }

            else if(this.isbig){
                this.big_stand();
                this.bidwalk_ani();
            }
            
        }
        else if(event.keyCode == cc.macro.KEY.d){
            this.dDown = false;
            this.anim.stop();
            if(this.issmall){
                this.small_stand();
                this.smallwalk_ani();
            }

            else if(this.isbig){
                this.big_stand();
                this.bidwalk_ani();
            }
            
        }
        else if(event.keyCode == cc.macro.KEY.space){
            this.SpaceDown = false;
            
        }
        if(event.keyCode == cc.macro.KEY.s){
            this.enter_tube = false;
        }
    }
    onKeyDown(event){
        
        if(event.keyCode == cc.macro.KEY.a){
            //cc.log("touch");
            this.aDown = true;
            this.dDown = false;
        }
        if(event.keyCode == cc.macro.KEY.d){
            //cc.log("touch");
            this.dDown = true;
            this.aDown = false;
        }
        if(event.keyCode == cc.macro.KEY.space){
            //cc.log(event.keyCode);
            //cc.log("Key Down: " + cc.macro.KEY.space);
            this.SpaceDown = true;
            
        }

        if(event.keyCode == cc.macro.KEY.s){
            cc.log('s');
            this.enter_tube = true;
        }
        
    }

    private smallwalk_ani(){
        this.anim.play('right_walk');
        this.animState = this.anim.play('right_walk');
    }

    private bidwalk_ani(){
        this.anim.play('Big_walk');
        this.animState = this.anim.play('Big_walk');
    }

    private small_jump(){
        this.anim.play('jump');
        this.animState = this.anim.play('jump');
    }

    private big_jump(){
        this.anim.play('Big_jump');
        this.animState = this.anim.play('Big_jump');
    }

    private small_stand(){
        this.anim.play('stand');
        this.animState = this.anim.play('stand');
    }
    private big_stand(){
        this.anim.play('Big_stand');
        this.animState = this.anim.play('Big_stand');
    }
    private small_sim(){
        this.anim.play('swim');
        this.animState = this.anim.play('swim');
    }

    private big_swim(){
        this.anim.play('Big_swim');
        this.animState = this.anim.play('Big_swim');
    }

    private jump(){
        cc.audioEngine.playEffect(this.jumpSound,false);
        this.onGround = false;
        this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,800);
        if(this.issmall)this.small_jump();
        else if(this.isbig) this.big_jump();
        
        
        
        
    }

    private reborn(rebornPos: cc.Vec2){
        this.node.position = rebornPos;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2();
    }
    hurt(){
        if(this.issmall)this.isDead = true;
        else if(this.isbig){
            this.issmall = true;
            this.isbig = false;
            this.anim.play('Big2small');
            this.animState = this.anim.play('Big2small');
        }
        
    }

    private playerMovement(dt){
        this.playerSpeed = 0;
        
        if(this.aDown){
            //cc.log(this.animState.isPlaying);
            if(this.animState.isPlaying){}
            else{
                if(!this.iswater){
                    if(this.issmall) this.smallwalk_ani();
                    else if(this.isbig) this.bidwalk_ani();
                }
                else {
                    if(this.issmall) this.small_sim();
                    else if(this.isbig) this.big_swim();
                    this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 1500),true);

                }
                
            }
            this.playerSpeed = -300;
            this.node.scaleX = -1;
        }
        if(this.dDown){
            
            if(this.animState.isPlaying){}
            else{
                if(!this.iswater){
                    if(this.issmall) this.smallwalk_ani();
                    else if(this.isbig) this.bidwalk_ani();
                }
                else {
                    if(this.issmall) this.small_sim();
                    else if(this.isbig) this.big_swim();
                    this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 1500),true);
                }
            }
            
            this.playerSpeed = 300;
            this.node.scaleX = 1;
            //this.animState.repeatCount = Infinity;
            
        }
        if(this.SpaceDown && this.onGround){
            this.jump();
        }
        
        this.node.x += this.playerSpeed * dt;
        //cc.log(this.playerSpeed);
    }

    update (dt) {

        //cc.log(this.enter_tube);
        if(!this.iswater)cc.director.getPhysicsManager().gravity = cc.v2 (0,-200);
        this.playerMovement(dt);
        this.maincamera.x = this.node.x;
        if(this.onGround == false){
            if(this.issmall){
                this.anim.stop('right_walk');
            }
            else if(this.isbig){
                this.anim.stop('Big_walk');
            }
            
        }
        else if(this.onGround == true && this.aDown == false && this.dDown == false){
            if(!this.iswater){
                if(this.issmall) this.small_stand();
                else if(this.isbig) this.big_stand();
            }
            
        }
        else if(this.iswater && this.aDown == false && this.dDown == false){
            
            if(this.issmall) this.small_stand();
            else if(this.isbig) this.big_stand();
            
            
        }
        if(this.isDead){
            cc.log('dead');
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.node.position = cc.v2(-195,22);
            this.isDead = false;
        }

        if(this.enter_tube && this.enter){
            cc.log(this.enter);
            cc.log('enter');
            this.node.position = cc.v2(-450,250);
            this.enter = false;
            this.enter_tube = false;
        }
    }

    onBeginContact(contact,self,other){
        cc.log(other.node.name);
        if(other.node.name == 'floor' || other.node.name == 'Mid_floor' || other.node.name == 'button_gray' ||  other.node.name == 'ques_block' || other.node.name == 'tree'){
            this.onGround = true;
            this.iswater = false;
        }
        if(other.node.name == 'water'){
            this.iswater = true;
            //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            cc.director.getPhysicsManager().gravity = cc.v2 (0,0);
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-30);
            //this.onGround = false;
        }

        if(other.node.name == 'damage'){
            if(this.issmall){
                this.isDead = true;
                this.Gameplay.getComponent(gameplay).countLife(-1);
            }
            else if(this.isbig){
                this.issmall = true;
                this.isbig = false;
                this.anim.play('Big2small');
                this.animState = this.anim.play('Big2small');
            }
        }

        else if(other.node.name == 'eat'){
            let change = this.schedule(()=>{this.anim.play('small2Big')},0,0,0);
            let stand = this.schedule(()=>{this.anim.play('Big_stand')},0,0,1.5);

            this.schedule(()=>{
                change;
                stand;
            },0,1,0);
            this.issmall = false;
            this.isbig = true;
            this.Gameplay.getComponent(gameplay).updateScore(100);
            //this.anim.play('small2Big');
        }

        else if(other.node.name == 'bound'){
            this.isDead = true;
            this.Gameplay.getComponent(gameplay).countLife(-1);
        }
        else if(other.node.name == 'Coins'){
            other.node.destroy();
            this.Gameplay.getComponent(gameplay).getcoin(1);
        }

        else if (other.node.name == 'tube'){
            cc.log('tube');
            this.onGround = true;
            if(other.node.getComponent(cc.PhysicsBoxCollider).tag == 10){
                
                this.enter = true; 
            }
            if(other.node.getComponent(cc.PhysicsBoxCollider).tag == 11){
                this.Gameplay.getComponent(gameplay).game_clear(2);
                cc.director.loadScene("gameclear");
            }
        }

        else if(other.node.name == 'mushroom'){
            if(this.node.y < other.node.y){
                if(this.issmall){
                    this.isDead = true;
                    this.Gameplay.getComponent(gameplay).countLife(-1);
                }
                else if(this.isbig){
                    this.anim.play('Big2small');
                    this.animState = this.anim.play('Big2small');
                    this.issmall = true;
                    this.isbig = false;
                }
            }
        }

        
    }

    onPreSolve(contact, self, other){
        if(other.node.name == 'water'){
            //cc.director.getPhysicsManager().gravity = cc.v2 (0,0);
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-30);
        }
    }

    onPostSolve(contact, self, other){
        if(other.node.name == 'water'){
            //cc.director.getPhysicsManager().gravity = cc.v2 (0,0);
            //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x,-1);
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-30);
        }
    }

    onEndContact(contact, self, other){
        if(other.node.name == 'water'){
            this.iswater = false;
            cc.log('leave');
        }
    }

    



    // update (dt) {}
}
