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
import player_Lv2 from "./player_Lv2";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property()
    Speed: number = null;

    private isDead = false;
    private isground = true;
    private anim = null;
    private animState = null;
    private dir  = false;
    private left = true;
    private right = false;
    private speed = 100;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.anim = this.getComponent(cc.Animation);
        cc.director.getPhysicsManager().enabled = true;  //1
        cc.director.getPhysicsManager().gravity = cc.v2 (0,-200);


    }

    start () {
        if(this.node.name == 'turtle' || this.node.name == 'Flower'){
            this.anim.play();
            this.animState = this.anim.play().name;
        }
        
        //cc.log(this.node.name,this.animState);
        
        if(this.node.name != 'Flower') this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-100,0);
        //cc.log(this.node.name,this.node.getComponent(cc.RigidBody).linearVelocity.x);
        
        this.node.scaleX = 1;
        this.flower_move();
        this.mushroom_move();

    }

    private flower_move(){
        if(this.node.name == 'Flower'){
            let flower_up = cc.moveBy(2,0,100);;
            let flower_down = cc.moveBy(2,0,-100);
            let flowerMove = cc.sequence(flower_up,flower_down);
            
            let action = cc.repeatForever(flowerMove);
            this.node.runAction(action);
            //cc.log('flower');
        }
    }

    private mushroom_move(){
        if(this.node.name == 'mushroom'){
            let left_walk = function() {
                this.node.scaleX = 1;
            }
            let right_walk = function(){
                this.node.scaleX = -1;
            }
    
            let a = function(){
                this.schedule(left_walk,0.3,1,0);
                this.schedule(right_walk,0,1,0.2);
            } 
            
            this.schedule(a,0,Infinity,0);
            //cc.log('mushroom_walk');
        }
        
    }

    update (dt) {
        
        if(this.isDead){
            this.destroy();
        }
        if(this.node.name != 'Flower'){
            if(this.dir == true){
                this.node.scaleX = -(this.node.scaleX);
                
                this.dir = false;
                //cc.log(this.node.scaleX);
                //cc.log(this.node.getComponent(cc.RigidBody).linearVelocity);
            }
            //cc.log(this.node.name,this.node.getComponent(cc.RigidBody).linearVelocity);
        }
        

        
    }

    onBeginContact(contact,self,other){
        if(self.node.name == 'Flower'){
            contact.disabled = true;
        }
        else if(other.node.name == 'Mid_floor'){
            this.isground = true;
        }
        else if(other.node.name == 'floor'){
            this.isground == true;
        }
        else if(other.node.name == 'block' ){
           
            if(self.node.y < other.node.y + other.node.height/2){
                contact.disabled = true;
            }
            
            else this.isground == true;
        }

        //turtle
        else if(self.node.name == 'turtle'){
            cc.log(this.node.name,other.node.name,this.node.getComponent(cc.RigidBody).linearVelocity);
            if(other.node.name == 'player'){
                
                if(other.node.y > this.node.y && this.animState == this.anim.play('turtle_move').name){
                    cc.log('dead');
                    this.anim.play('turtle_dead');
                    this.animState = this.anim.play('turtle_dead').name;
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                }
                else if(other.node.y < this.node.y && this.animState == this.anim.play('turtle_move').name){
                    other.node.getComponent(player).hurt();
                    other.node.getComponent(player_Lv2).hurt();
                }
                else if(this.animState == this.anim.play('turtle_dead').name){
                    if(this.node.x > other.node.x){ //playery is left
                        //cc.log('t>p');
                        this.node.scaleX = -1;
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(3000,0);
                    }
                    else {
                        //cc.log('t<p');
                        this.node.scaleX = 1;
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-3000,0);
                    }
                    this.anim.play('turtle_slide');
                    this.animState = this.anim.play('turtle_slide').name;
                }
                else if(this.animState == this.anim.play('turtle_slide').name && this.node.y > other.node.y){
                    other.node.getComponent(player).hurt();
                    other.node.getComponent(player_Lv2).hurt();
                }
                else if(this.animState == this.anim.play('turtle_slide').name && this.node.y < other.node.y){
                    //cc.log('t->d');
                    this.anim.play('turtle_dead');
                    this.animState = this.anim.play('turtle_dead').name;
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                }
            }
            else if(other.node.getComponent(cc.PhysicsBoxCollider).tag == 1){
                //cc.log(this.node.name,other.node.name);
                cc.log(this.node.name,other.node.name);
                this.left = !(this.left);
                this.right = !(this.right);
                if(this.left){ //face to right -> will go to left
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-100,0)
                }
                else{
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(100,0)
                }
                this.dir = true;
                
            }
            else if(other.node.getComponent(cc.PhysicsBoxCollider).tag == 2){
                contact.disabled = true;
            }
        } 
            
        else if(self.node.name == 'mushroom' ){
            cc.log(this.node.name,other.node.name);
            if(other.node.name == 'player'){
                if(contact.getWorldManifold().normal.y >0){
                    this.anim.play('mushroom_dead');
                    this.animState =  this.anim.play('mushroom_dead').name;
                    this.scheduleOnce(()=>{this.node.destroy()},1);
                }
                
            }
            else if (other.node.getComponent(cc.PhysicsBoxCollider).tag == 1){
                //this.node.scaleX = -(this.node.scaleX);
                cc.log(this.node.name,other.node.name);
                this.left = !(this.left);
                this.right = !(this.right);
                if(this.left){ //face to right -> will go to left
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-100,0)
                }
                else{
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(100,0)
                }
                this.dir = true;
            }
            else if(other.node.getComponent(cc.PhysicsBoxCollider).tag == 2){
                contact.disabled = true;
            }
            
        }
        
    }
    
}
