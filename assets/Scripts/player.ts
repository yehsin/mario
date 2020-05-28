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
export default class player extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    maincamera: cc.Node = null;

    private playerSpeed: number = 0;
    private anim = null;
    private animState = null;
    private aDown:boolean = false;
    private dDown:boolean = false;
    private SpaceDown:boolean = false;
    private issmall = true;
    private isbig = false;
    
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
    }
    onKeyDown(event){
        
        if(event.keyCode == cc.macro.KEY.a){
            cc.log("touch");
            this.aDown = true;
            this.dDown = false;
        }
        if(event.keyCode == cc.macro.KEY.d){
            cc.log("touch");
            this.dDown = true;
            this.aDown = false;
        }
        if(event.keyCode == cc.macro.KEY.space){
            cc.log(event.keyCode);
            cc.log("Key Down: " + cc.macro.KEY.space);
            this.SpaceDown = true;
            
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

    private jump(){
        this.onGround = false;
        this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,1300);
        if(this.issmall)this.small_jump();
        else if(this.isbig) this.big_jump();
        
    }

    private playerMovement(dt){
        this.playerSpeed = 0;
        
        if(this.aDown){
            cc.log(this.animState.isPlaying);
            if(this.animState.isPlaying){}
            else{
                if(this.issmall) this.smallwalk_ani();
                else if(this.isbig) this.bidwalk_ani();
            }
            this.playerSpeed = -300;
            this.node.scaleX = -1;
        }
        if(this.dDown){
            
            if(this.animState.isPlaying){}
            else{
                if(this.issmall) this.smallwalk_ani();
                else if(this.isbig) this.bidwalk_ani();
            }
            this.playerSpeed = 300;
            this.node.scaleX = 1;
            //this.animState.repeatCount = Infinity;
            
        }
        if(this.SpaceDown && this.onGround){
            this.jump();
        }

        this.node.x += this.playerSpeed * dt;
        cc.log(this.playerSpeed);

    }
    update (dt) {
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
            if(this.issmall) this.small_stand();
            else if(this.isbig) this.big_stand();
        }
    }

    onBeginContact(contact,self,other){
        if(other.node.name == 'floor' || other.node.name == 'Mid_floor' || other.node.name == 'button_gray' ||  other.node.name == 'question_block' || other.node.name == 'tube' || other.node.name == 'tree'){
            this.onGround = true;
        }
        else if(other.node.name == 'block'){
            cc.log(contact.getWorldManifold.points);
            if(self.node.y < other.node.y + other.node.height/2){
                contact.disabled = true;
            }
            else {
                this.onGround = true;
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
            //this.anim.play('small2Big');
            

        }
        
    }
}
