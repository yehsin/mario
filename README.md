# Software Studio 2020 Spring Assignment 2

[toc]
## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|10%|Y|
|Complete Game Process|5%|Y|
|Basic Rules|45%|Y|
|Animations|10%|Y|
|Sound Effects|10%|Y|
|UI|10%|Y|

## Website Detail Description

# Basic Components Description : 
## World map : 
### Stage1
![](https://i.imgur.com/9lmhNJT.png)
1. Background will follow camera move.
2. flower animation increasing funny.
3. Too far to jump. Warning! There is a pitfall that a stealth question block will let player collision and drop.Howerver, we can use it jump to other side, too. 
![](https://i.imgur.com/3mskVxo.jpg)
![](https://i.imgur.com/niICjTo.png)
4. Touch flag can go to Stage 2.


### Stage2 
![](https://i.imgur.com/IHTstqN.png)
![](https://i.imgur.com/KbdrGYo.png)
![](https://i.imgur.com/fxUcSXC.png)
1. It totally different style from Stage 1.
2. Background will not follow camera. Just like we also move.
3. There are some question block in the sky. But how to arrive there? The secret is --- TUBE!!! The tube exist under the water, we can move to another tube to arrive sky.
4. But! Be careful! You will hurt when you drop to deep water. And there are some spikes under the water.
5. Not only spikes, but also the magma will damage the player.
6. When player arrive the rightest tube, the stage is clear!

## Player : 
### operation
* **A** left walk

* **D** right walk

* **space** jump

### Animation

**little mario**  ![](https://i.imgur.com/dqT8iT4.png)

* **walk** ![](https://i.imgur.com/hToXXru.png)

* **jump** ![](https://i.imgur.com/rvzXHV0.png)

* **swim** ![](https://i.imgur.com/c2q5PaT.png)

* **grow** ![](https://i.imgur.com/I6JzTtQ.png)






**big mario** ![](https://i.imgur.com/EMwITgI.png)
 
* **walk** ![](https://i.imgur.com/SnU4tzp.png)

* **jump** ![](https://i.imgur.com/KsAHzBY.png)

* **swim** ![](https://i.imgur.com/uAhNWas.png)

* **hurt** ![](https://i.imgur.com/JkM18eR.png)





## Enemies : 
* **mushroom** ![](https://i.imgur.com/VCK9b6e.png)

* **Turtle** ![](https://i.imgur.com/UwVkiGc.png)


### Animation

* **mushroom** 
>> Mushroom will die when player stand on it's head.
>> If player touch it without standind beyond it, player will hurt.

* *walking* ![](https://i.imgur.com/rFKw19Y.png) ![](https://i.imgur.com/VCfPqDu.png)
* *die* ![](https://i.imgur.com/ty08riN.png)


* **Turtle** 
>> It won't be died but it always can slide and never born again.
>> When it is walking and sliding, player will be hurt without standing beyond it.
* *Walking* ![](https://i.imgur.com/hWJ83oy.png) ![](https://i.imgur.com/wMNRUzl.png) (dangerous)

* *die* ![](https://i.imgur.com/Wylrilk.png) (safe)

* *sliding* ![](https://i.imgur.com/RwjhXF3.png) ![](https://i.imgur.com/wWO9Hj8.png) (dagerous)



## Question Blocks : 
>> Some queation Blocks will born mushroom and player will grow when he touch it.
>> Some will born coins.
### Animation
* **Rotation**
![](https://i.imgur.com/Wmyfk7x.png) 
![](https://i.imgur.com/W6QGuky.png) 
![](https://i.imgur.com/ond3cnH.png)
* **bump coin**
![](https://i.imgur.com/L7q4lUu.png)


## Sound effects : 
* Lv1 BGM 2 
* Lv2 BGM 3
* player jump effects

## UI : 
* Score ![](https://i.imgur.com/m3YDjdW.png) 
>> * Score = coins mounts *10 + enemys dying * 50

* Time ![](https://i.imgur.com/FwwntMk.png)
>> * Timer give 250 seconds

* Life ![](https://i.imgur.com/40QFc7M.png)

>> * Life store in firebase database. It can read and write.

* Coins ![](https://i.imgur.com/t8zMukN.png)





# Bonus Functions Description : 
**LeaderBoard** : Besides players score, it also show the highest score .
* ***game clear*** ![](https://i.imgur.com/NfURRAt.jpg)
* ***Dead menu*** ![](https://i.imgur.com/VoiRKsF.png)


**Damage block** : Not only enemies will hurt player, but also Sprites and magma.
**Transposition Tube*** : Tube not just a static block, it can be a transposotion.
