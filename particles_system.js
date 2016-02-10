// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 1-1: stroke and fill

//var oneParticle;var twoParticle;var threeParticle;
var particleSystem = [];

var mySound;
var attractors = [];

    function preload() {
  mySound = loadSound('explosion.m4a');
}
function setup() {
    var canvas = createCanvas(windowWidth,windowHeight);
//background(255,255,0);
    frameRate(30);
    colorMode(HSB,360,100,100,1);
    
        var at = new Attractor(createVector(2*width/3,height/2),5);
        attractors.push(at);
        var at2 = new Attractor(createVector(width/3,height/2),5);
        attractors.push(at2);
        
//    for(var i=0;i<200; i++){
//        var pos = createVector(width/2,height/2);
//        var vel = createVector(0,1);
//        vel.rotate(random(0,TWO_PI));
//        vel.mult(random(1,10));
//        var newborn = new Particle(pos,vel);
//        particleSystem.push(newborn)
//    }
    
//      var pos = createVector(width/2,height/2);
//      var vel = createVector(0,5)
//      oneParticle = new Particle(pos,vel);
//      var pos1 =createVector(width/3,height/3);
//      var vel1 = createVector(0,5)
//      twoParticle = new Particle(pos1,vel1);
//      var pos2 =createVector(width*2/3,height*2/3);
//      var vel2 = createVector(0,5)
//      threeParticle = new Particle(pos2,vel2);
 }

function draw() {
    
 background(0,0,.1,0.1);
     //blendMode(LIGHTEST);
    for(var i=particleSystem.length-1;i>=0;i--){
        var p = particleSystem[i];
        if(p.areYouDeadYet()){
            //removes the particle from array
            particleSystem.splice(i,1);  
            var ppos = p.getPos(); 
//            if(particleSystem.length<1000 
//               && ppos.x < width && ppos.x > 0 && ppos.y < height && ppos.y >0){
//                createMightParticle(ppos);
//            };
        }else{
            p.update();
            p.draw();
            
        }
    }
    if(mouseIsPressed){
        createMightParticle();
    }
    attractors.forEach(function(at){
        at.draw();
    })
//    particleSystem.forEach(function(p){
//                           p.update();
//                           p.draw();
//                           })

    
//oneParticle.update();
//    oneParticle.draw();
//    twoParticle.update();
//    twoParticle.draw();
//    threeParticle.update();
//    threeParticle.draw();
   
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
}



var Particle = function(ppp, vvv,hhh){
    var pos = ppp.copy();
    var vel = vvv.copy();
    var size = random(100,100);
    var accl = createVector(0,5)//gravity
    
    var initiallifespan = random(1000,2000);  
    this.lifespan =initiallifespan;
    this.hue = random(hhh-15,hhh+15);
    

    
    this.update = function(){
        this.lifespan--;//this.lispan = this.lifespan -1;
             
        
     attractors.forEach(function(A){
             
        var att = p5.Vector.sub(A.getPos(), pos);
        var distanceSq = att.magSq();
             
        if(distanceSq > 1){
            att.div(distanceSq);
            att.mult(10*A.getStrength());
            accl.add(att);
        }
    });

    vel.add(accl);
    pos.add(vel);
    accl.mult(0);
    vel.limit(20);

}
 this.draw = function(){
     var transparency =  0.7//map(this.lifespan,0,initiallifespan,0,1);
     fill(this.hue,100,100,transparency);
//     fill(random(0,255),random(0,255),random(0,255));
     stroke(this.hue,100, 100, transparency);//color satration
     strokeWeight(15)
//     line(pos.x,pos.y,pos.x - 100*vel.x,pos.y - 100*vel.y);//line size
    
     noStroke();
     ellipse(pos.x,
            pos.y,
            size,
            size);
     
     
 }   
 this.areYouDeadYet = function(){
     return this.lifespan <= 0? true : false;
//     if(lifespan <= 0) return true;
//     else return false;
 }
 this.getPos=function(){
     return pos.copy()
 }
}
function createMightParticle(initialPos){
    
    
    //mySound.play();
    var pos;
        if(!initialPos){
            pos = createVector(mouseX,mouseY);
        }else{
            pos = initialPos.copy();
        }

        
    
        
        for(var i=0;i<1; i++){

            var hue = random(0,360);
            var saturation = random(0,100);
            var vel = createVector(0,1);    
//            vel.rotate(random(0,TWO_PI));
            vel.mult(random(1,3));
            var cp = createParticle(pos, vel, hue)//group
            if (i == 0) {
                cp()
            } else {
                setTimeout(cp, 100);
            }
            cp.posAdd()
        
        }
    
}

function createParticle(pos, vel, hue) {
    var p = pos, v = vel, h = hue;
    var draw=function() {
        var newborn = new Particle(pos,vel,hue);
        particleSystem.push(newborn);
    }
    
    draw.posAdd = function() {
        console.log(p)
        p.add(2, 2)
        console.log(p)
    }
    return draw;
}
//function mouseClicked(){
//    createMightParticle();
//    
//}
var Attractor = function(pos,s){
    var pos = pos.copy();
    var strength = s;
    this.draw = function(){
        noStroke();
        fill(0,100,100);
        ellipse(pos.x,pos.y,strength,strength);
        
    }
    this.getStrength = function(){
        return strength;
    }
    this.getPos= function(){
        return pos.copy();
    }
   
    }
        
    

