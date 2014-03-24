// Tharin is a melee fighter with shield, warcry, and terrify skills.
// this.shield() lets him take one-third damage while defending.
// this.warcry() gives allies within 10m 30% haste for 5s, every 10s.
// this.terrify() sends foes within 30m fleeing for 5s, once per match.

var friends = this.getFriends();
var enemies = this.getEnemies();
if (enemies.length === 0) return;  // Chill if all enemies are dead.
var enemy = this.getNearest(enemies);
var friend = this.getNearest(friends);
if (typeof this.terrifyTimer === 'undefined')
    this.terrifyTimer=0;

// Which one do you do at any given time? Only the last called action happens.
this.attack(enemy);
var nearAnEnemy = this.distance(enemy) < 4;
var nearAFriend = this.distance(friend) < 4;

this.findType = function(units, type) {
    for (var i = 0; i < units.length; ++i) {
        var unit = units[i];
        if (unit.type === type)
            return unit;
    }
    return null;
};
var hero=this.findType(enemies, 'shaman');
if(hero!==null){
   // this.say('attack hero shaman');
    for(var i=0; i<friends.length; i++){
        if(friends[i].type==='archer'){
           // friends[i].attack(hero);
        }
    }
}
else{
    hero=this.findType(enemies, 'brawler');
}

if(nearAnEnemy) {
     this.shield();//this.attack(nearestEnemy);
}
else {
     this.move(enemy.pos);
}
if(!this.getCooldown('warcry')){
    if(nearAFriend){
        this.warcry();
    }
}

if((this.now()-this.terrifyTimer)<5){
    if(hero!==null){
        this.attack(hero);
    }
}

if(!this.getCooldown('terrify') && this.health<100){
    this.terrifyTimer=this.now();
    this.terrify();
}


// You can also command your troops with this.say():
//this.say("Defend!", {targetPos: {x: 30, y: 30}}));
//this.say("Attack!", {target: enemy});
//this.say("Move!", {targetPos: {x: 40, y: 40});

// You can store state on this across frames:
    
this.lastHealth = this.health;